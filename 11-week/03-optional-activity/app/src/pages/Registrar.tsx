import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, useIonRouter, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { crearComida, NuevaComida } from '../services/comidasApi';
import FormularioComida from '../components/FormularioComida';
import MensajeError from '../components/MensajeError';

// Pestaña "Registrar": una sola tarea, llenar el formulario y guardar.
const Registrar: React.FC = () => {
  const [errorGuardado, setErrorGuardado] = useState('');
  const [mostrarToast] = useIonToast();
  const router = useIonRouter();

  // Al volver a esta pestaña se limpia un error viejo.
  useIonViewWillEnter(() => {
    setErrorGuardado('');
  });

  async function agregar(comida: NuevaComida): Promise<boolean> {
    setErrorGuardado('');
    try {
      const nueva = await crearComida(comida);
      mostrarToast({
        message: `Se registró «${nueva.descripcion}» en ${nueva.franja}`,
        duration: 2500,
        color: 'success',
        position: 'top',
      });
      // Feedback + llevar al usuario a ver el resultado.
      router.push('/comidas', 'root');
      return true;
    } catch (e) {
      setErrorGuardado((e as Error).message);
      return false;
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar comida</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="contenedor">
          <FormularioComida onAgregar={agregar} />
          {errorGuardado && <MensajeError mensaje={errorGuardado} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Registrar;
