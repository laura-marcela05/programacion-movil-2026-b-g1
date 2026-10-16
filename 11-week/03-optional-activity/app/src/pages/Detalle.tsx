import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent } from '@ionic/react';
import { obtenerComida, Comida } from '../services/comidasApi';
import MensajeError from '../components/MensajeError';
import EstadoCarga from '../components/EstadoCarga';
import FranjaBadge from '../components/FranjaBadge';
import '../components/comidas.css';

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
            <IonBackButton defaultHref="/comidas" text="Volver" />
          </IonButtons>
          <IonTitle>Detalle de comida</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="contenedor">
          {cargando && <EstadoCarga mensaje="Cargando la comida..." />}

          {error && <MensajeError mensaje={error} onReintentar={cargar} />}

          {comida && (
            <>
              <FranjaBadge franja={comida.franja} />
              <h2 className="comida-nombre">{comida.descripcion}</h2>
              <p className="comida-fecha">
                {new Date(comida.fecha).toLocaleString('es-CO', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Detalle;
