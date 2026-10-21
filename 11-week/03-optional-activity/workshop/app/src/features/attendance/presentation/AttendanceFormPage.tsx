import { useEffect, useState } from 'react';
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { hour } from './HistoryList';
import { MUSCLE_LABELS } from '../domain/Session';
import { CheckoutForm } from './CheckoutForm';
import { useActiveSession } from './useActiveSession';
import { useOnline } from './useOnline';
import { card } from './styles';

const minutesSince = (iso: string, now: number) => Math.max(0, Math.floor((now - new Date(iso).getTime()) / 60000));

const AttendanceFormPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const {
    status, session, selected, done, saved, actionError, conflict, closeConflict, closeSaved,
    reload, checkIn, openCheckout, toggleGroup, cancelCheckout, submitCheckout,
  } = useActiveSession(studentId);
  const [now, setNow] = useState(() => Date.now());
  const [confirmCancel, setConfirmCancel] = useState(false);
  const online = useOnline();

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const canCheckIn = status === 'noActiveSession' || status === 'submitting';
  const busy = status === 'submitting' || status === 'closing';
  const onCheckout = status === 'checkoutForm' || status === 'closing';
  const askCancel = () => (selected.length > 0 ? setConfirmCancel(true) : cancelCheckout());
  const footer = canCheckIn
    ? { label: actionError ? 'Reintentar' : 'Registrar entrada', run: checkIn, off: busy || !online }
    : status === 'active'
      ? { label: 'Registrar salida', run: openCheckout, off: false }
      : onCheckout
        ? { label: actionError ? 'Reintentar' : 'Confirmar', run: submitCheckout, off: busy || selected.length === 0 || !online }
        : status === 'completed'
          ? { label: 'Volver', run: undefined, off: false }
          : null;
  const offlineBlocked = !online && (canCheckIn || onCheckout);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/students/${studentId}/history`} text="" aria-label="Volver al historial" />
          </IonButtons>
          <IonTitle>Registrar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {status === 'initializing' && (
          <div className="ion-text-center" role="status" aria-label="Comprobando la sesión">
            <IonSpinner name="crescent" />
          </div>
        )}
        {status === 'initError' && (
          <div className="ion-text-center" role="alert">
            <p>No se pudo comprobar si el estudiante tiene una sesión activa</p>
            <IonButton onClick={reload} style={{ minHeight: 'var(--ht-touch-min)' }}>
              Reintentar
            </IonButton>
          </div>
        )}
        {canCheckIn && (
          <div style={card}>
            <p style={{ fontSize: 'var(--ht-font-lg)' }}>Sin sesión activa</p>
            {actionError && (
              <p role="alert" style={{ color: 'var(--ht-danger)' }}>
                No se pudo registrar la entrada. Intenta de nuevo.
              </p>
            )}
          </div>
        )}
        {status === 'active' && session && (
          <div style={card}>
            <p style={{ fontSize: 'var(--ht-font-lg)' }}>Entrada: {hour(session.checkInAt)}</p>
            <p style={{ fontSize: 'var(--ht-font-md)', color: 'var(--ht-text-muted)' }}>
              Tiempo transcurrido: {minutesSince(session.checkInAt, now)} min
            </p>
          </div>
        )}
        {onCheckout && (
          <CheckoutForm
            selected={selected}
            disabled={busy}
            actionError={actionError}
            onToggle={toggleGroup}
            onCancel={askCancel}
          />
        )}
        {status === 'completed' && done && (
          <div style={card}>
            <p style={{ fontSize: 'var(--ht-font-lg)' }}>Sesión registrada</p>
            <p>
              Entrada {hour(done.checkInAt)} · Salida {hour(done.checkOutAt)}
            </p>
            <p>Duración: {done.durationMinutes} min</p>
            <p>Grupos: {done.muscleGroups.map((m) => MUSCLE_LABELS[m]).join(', ')}</p>
          </div>
        )}
        <IonToast
          isOpen={conflict}
          message="El estado de la sesión cambió, la actualizamos"
          duration={3000}
          onDidDismiss={closeConflict}
        />
        <IonToast isOpen={saved} message="Salida registrada" duration={3000} onDidDismiss={closeSaved} />
        <IonAlert
          isOpen={confirmCancel}
          header="¿Descartar la selección?"
          message="Se perderán los grupos musculares elegidos."
          buttons={[
            { text: 'Seguir editando', role: 'cancel' },
            { text: 'Descartar', role: 'destructive', handler: cancelCheckout },
          ]}
          onDidDismiss={() => setConfirmCancel(false)}
        />
      </IonContent>
      {footer && (
        <IonFooter>
          <IonToolbar>
            <div className="ion-padding-horizontal">
            {offlineBlocked && (
                <p role="alert" style={{ color: 'var(--ht-danger)', fontSize: 'var(--ht-font-md)', margin: 0, paddingBottom: 'var(--ht-space-2)' }}>
                  Sin conexión. Conéctate para registrar la entrada o la salida.
                </p>
            )}
              <IonButton
                expand="block"
                disabled={footer.off}
                onClick={footer.run}
                routerLink={status === 'completed' ? `/students/${studentId}/history` : undefined}
                routerDirection="back"
                aria-label={busy ? 'Guardando' : undefined}
                style={{ minHeight: 'var(--ht-touch-min)' }}
              >
                {busy ? <IonSpinner name="crescent" /> : footer.label}
              </IonButton>
            </div>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default AttendanceFormPage;