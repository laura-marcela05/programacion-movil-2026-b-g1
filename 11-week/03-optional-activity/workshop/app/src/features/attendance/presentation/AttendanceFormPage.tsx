import { useEffect, useState } from 'react';
import {
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
import { useActiveSession } from './useActiveSession';

const minutesSince = (iso: string, now: number) => Math.max(0, Math.floor((now - new Date(iso).getTime()) / 60000));
const card = { padding: 'var(--ht-space-4)', background: 'var(--ht-surface)' };

const AttendanceFormPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { status, session, actionError, conflict, closeConflict, reload, checkIn } = useActiveSession(studentId);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const canCheckIn = status === 'noActiveSession' || status === 'submitting';

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
        <IonToast
          isOpen={conflict}
          message="El estado de la sesión cambió, la actualizamos"
          duration={3000}
          onDidDismiss={closeConflict}
        />
      </IonContent>
      {canCheckIn && (
        <IonFooter>
          <IonToolbar>
            <div className="ion-padding-horizontal">
              <IonButton
                expand="block"
                disabled={status === 'submitting'}
                onClick={checkIn}
                aria-label={status === 'submitting' ? 'Registrando entrada' : undefined}
                style={{ minHeight: 'var(--ht-touch-min)' }}
              >
                {status === 'submitting' ? <IonSpinner name="crescent" /> : actionError ? 'Reintentar' : 'Registrar entrada'}
              </IonButton>
            </div>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default AttendanceFormPage;