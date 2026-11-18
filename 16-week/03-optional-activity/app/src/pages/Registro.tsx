import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonInput, IonSelect, IonSelectOption, IonButton, useIonRouter } from '@ionic/react';
import { registrarse } from '../services/authApi';
import MensajeError from '../components/MensajeError';

const Registro: React.FC = () => {
  const router = useIonRouter();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  async function crear() {
    if (!nombre.trim() || !correo.trim() || !clave) {
      setError('Escribe tu nombre, tu correo y una contraseña');
      return;
    }
    if (clave.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    setEnviando(true);
    setError('');
    try {
      await registrarse(nombre.trim(), correo.trim(), clave, objetivo);
      router.push('/home', 'root', 'replace');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          label="Nombre"
          labelPlacement="stacked"
          value={nombre}
          onIonInput={(e) => setNombre(String(e.detail.value ?? ''))}
        />
        <IonInput
          label="Correo"
          labelPlacement="stacked"
          type="email"
          value={correo}
          onIonInput={(e) => setCorreo(String(e.detail.value ?? ''))}
        />
        <IonInput
          label="Contraseña (mínimo 8 caracteres)"
          labelPlacement="stacked"
          type="password"
          value={clave}
          onIonInput={(e) => setClave(String(e.detail.value ?? ''))}
        />
        <IonSelect
          label="Objetivo (opcional)"
          labelPlacement="stacked"
          placeholder="Elige uno"
          value={objetivo}
          onIonChange={(e) => setObjetivo(String(e.detail.value ?? ''))}
        >
          <IonSelectOption value="bajar de peso">Bajar de peso</IonSelectOption>
          <IonSelectOption value="mantenerse en el peso">Mantenerse en el peso</IonSelectOption>
          <IonSelectOption value="subir de peso">Subir de peso</IonSelectOption>
        </IonSelect>

        {error && <MensajeError mensaje={error} />}

        <IonButton expand="block" onClick={crear} disabled={enviando}>
          {enviando ? 'Creando...' : 'Crear cuenta'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Registro;