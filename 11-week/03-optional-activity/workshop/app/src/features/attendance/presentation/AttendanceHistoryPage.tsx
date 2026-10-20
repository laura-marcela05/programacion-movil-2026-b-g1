import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router-dom';

const AttendanceHistoryPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
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
      <IonContent className="ion-padding">
        <p>Estudiante: {studentId}</p>
        <IonButton routerLink={`/students/${studentId}/attendance`} style={{ minHeight: 'var(--ht-touch-min)' }}>
          Registrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AttendanceHistoryPage;