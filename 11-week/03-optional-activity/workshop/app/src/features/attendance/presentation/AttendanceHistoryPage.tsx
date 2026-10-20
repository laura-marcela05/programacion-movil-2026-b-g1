import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { HistoryList } from './HistoryList';
import { useSessionHistory } from './useSessionHistory';

const AttendanceHistoryPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { status, sessions, reload } = useSessionHistory(studentId);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" aria-label="Volver" />
          </IonButtons>
          <IonTitle>Historial</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={async (e) => {
            await reload();
            e.detail.complete();
          }}
        >
          <IonRefresherContent />
        </IonRefresher>
        <HistoryList status={status} sessions={sessions} onRetry={reload} />
        <div className="ion-padding">
          <IonButton routerLink={`/students/${studentId}/attendance`} style={{ minHeight: 'var(--ht-touch-min)' }}>
            Registrar sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AttendanceHistoryPage;