import { IonButton, IonChip, IonIcon, IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';
import { barbellOutline } from 'ionicons/icons';
import { MUSCLE_LABELS, type Session } from '../domain/Session';
import type { HistoryStatus } from './useSessionHistory';

interface Props {
  status: HistoryStatus;
  sessions: Session[];
  studentId: string;
  onRetry: () => void;
}

const day = (iso: string) => new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
const hour = (iso: string) => new Date(iso).toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' });

export function HistoryList({ status, sessions, studentId, onRetry }: Props) {
  if (status === 'loading') {
    return (
      <IonList aria-busy="true" aria-label="Cargando historial">
        {[1, 2, 3].map((n) => (
          <IonItem key={n}>
            <IonLabel>
              <IonSkeletonText animated style={{ width: '35%' }} />
              <IonSkeletonText animated style={{ width: '70%' }} />
              <IonSkeletonText animated style={{ width: '50%' }} />
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    );
  }
  if (status === 'error') {
    return (
      <div className="ion-padding ion-text-center" role="alert">
        <p>No se pudo cargar el historial</p>
        <IonButton onClick={onRetry} style={{ minHeight: 'var(--ht-touch-min)' }}>
          Reintentar
        </IonButton>
      </div>
    );
  }
  if (status === 'empty') {
    return (
      <div className="ion-padding ion-text-center">
        <IonIcon icon={barbellOutline} aria-hidden="true" style={{ fontSize: '3rem', color: 'var(--ht-text-muted)' }} />
        <p>Todavía no hay sesiones registradas</p>
        <IonButton routerLink={`/students/${studentId}/attendance`} style={{ minHeight: 'var(--ht-touch-min)' }}>
          Registrar primera sesión
        </IonButton>
      </div>
    );
  }
  return (
    <IonList>
      {sessions.map((s) => (
        <IonItem key={s.id}>
          <IonLabel>
            <h2>{day(s.checkInAt)}</h2>
            <p>
              {hour(s.checkInAt)} a {hour(s.checkOutAt)} ({s.durationMinutes} min)
            </p>
            <div>
              {s.muscleGroups.map((m) => (
                <IonChip key={m}>{MUSCLE_LABELS[m]}</IonChip>
              ))}
            </div>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}