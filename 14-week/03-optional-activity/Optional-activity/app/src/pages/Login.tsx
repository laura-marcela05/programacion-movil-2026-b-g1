import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, useIonRouter } from '@ionic/react';
import { iniciarSesion } from '../services/authApi';
import MensajeError from '../components/MensajeError';

const Login: React.FC = () => {
  const router = useIonRouter();
  const location = useLocation();
  const sesionVencida = new URLSearchParams(location.search).get('motivo') === 'vencida';

  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  async function entrar() {
    if (!correo.trim() || !clave) {
      setError('Escribe tu correo y tu contraseña');
      return;
    }
    setEnviando(true);
    setError('');
    try {
      await iniciarSesion(correo.trim(), clave);
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
          <IonTitle>NutriTrack</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {sesionVencida && !error && (
          <p role="alert">Tu sesión venció. Vuelve a iniciar sesión para ver tus comidas.</p>
        )}

        <IonInput
          label="Correo"
          labelPlacement="stacked"
          type="email"
          value={correo}
          onIonInput={(e) => setCorreo(String(e.detail.value ?? ''))}
        />
        <IonInput
          label="Contraseña"
          labelPlacement="stacked"
          type="password"
          value={clave}
          onIonInput={(e) => setClave(String(e.detail.value ?? ''))}
        />

        {error && <MensajeError mensaje={error} />}

        <IonButton expand="block" onClick={entrar} disabled={enviando}>
          {enviando ? 'Entrando...' : 'Iniciar sesión'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
