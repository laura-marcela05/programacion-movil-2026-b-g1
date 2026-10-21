import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { MUSCLE_LABELS, type Session } from '../domain/Session';
import { hour } from './HistoryList';
import { card } from './styles';
import { useSessionDetail } from './useSessionDetail';

const longDay = (iso: string) => new Date(iso).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
const rowsOf = (s: Session): [string, string][] => [
  ['Fecha', longDay(s.checkInAt)],
  ['Entrada', hour(s.checkInAt)],
  ['Salida', hour(s.checkOutAt)],
  ['Duración', `${s.durationMinutes} min`],
];
const touch = { minHeight: 'var(--ht-touch-min)' };

const SessionDetailPage: React.FC = () => {
  const { studentId, sessionId } = useParams<{ studentId: string; sessionId: string }>();
  const { status, session, reload } = useSessionDetail(studentId, sessionId);
  const historyLink = `/students/${studentId}/history`;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={historyLink} text="" aria-label="Volver al historial" />
          </IonButtons>
          <IonTitle>Detalle de sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {status === 'loading' && (
          <div style={card} role="status" aria-label="Cargando la sesión">
            <IonSkeletonText animated style={{ width: '60%' }} />
            <IonSkeletonText animated style={{ width: '40%' }} />
            <IonSkeletonText animated style={{ width: '50%' }} />
          </div>
        )}
        {status === 'error' && (
          <div className="ion-text-center" role="alert">
            <p>No se pudo cargar la sesión</p>
            <IonButton onClick={reload} style={touch}>
              Reintentar
            </IonButton>
          </div>
        )}
        {status === 'notFound' && (
          <div className="ion-text-center" role="alert">
            <p style={{ fontSize: 'var(--ht-font-lg)' }}>No encontramos esta sesión</p>
            <p style={{ color: 'var(--ht-text-muted)' }}>El enlace puede ser incorrecto o la sesión ya no existe.</p>
            <IonButton routerLink={historyLink} routerDirection="back" style={touch}>
              Volver al historial
            </IonButton>
          </div>
        )}
        {status === 'ready' && session && (
          <div style={card}>
            <dl style={{ margin: 0 }}>
              {rowsOf(session).map(([label, value]) => (
                <div key={label}>
                  <dt style={{ fontSize: 'var(--ht-font-sm)', color: 'var(--ht-text-muted)' }}>{label}</dt>
                  <dd style={{ fontSize: 'var(--ht-font-lg)', margin: '0 0 var(--ht-space-3)' }}>{value}</dd>
                </div>
              ))}
              <dt style={{ fontSize: 'var(--ht-font-sm)', color: 'var(--ht-text-muted)' }}>Grupos musculares</dt>
              <dd style={{ margin: 0 }}>
                {session.muscleGroups.map((m) => (
                  <IonChip key={m}>
                    <IonLabel>{MUSCLE_LABELS[m]}</IonLabel>
                  </IonChip>
                ))}
              </dd>
            </dl>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SessionDetailPage;