import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonText, IonSpinner } from '@ionic/react';
import { obtenerComida, Comida } from '../services/comidasApi';
import MensajeError from '../components/MensajeError';

const Detalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [comida, setComida] = useState<Comida | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  function cargar() {
    setCargando(true);
    setError('');
    obtenerComida(id as string)
      .then(setComida)
      .catch((e) => setError((e as Error).message))
      .finally(() => setCargando(false));
  }

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Detalle de comida</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {cargando && (
          <IonText>
            <p><IonSpinner name="dots" /> Cargando...</p>
          </IonText>
        )}

        {error && <MensajeError mensaje={error} onReintentar={cargar} />}

        {comida && (
          <IonText>
            <h2>{comida.franja}</h2>
            <p>{comida.descripcion}</p>
            <p>{new Date(comida.fecha).toLocaleString()}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Detalle;
