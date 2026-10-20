import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router-dom';

const AttendanceFormPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
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
        <p>Sin sesión activa</p>
      </IonContent>
    </IonPage>
  );
};

export default AttendanceFormPage;