import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonText, IonToast, IonSpinner, useIonRouter } from '@ionic/react';
import { obtenerComidas, crearComida, Comida, NuevaComida } from '../services/comidasApi';
import { cerrarSesion } from '../services/authApi';
import ListaComidas from '../components/ListaComidas';
import FormularioComida from '../components/FormularioComida';
import MensajeError from '../components/MensajeError';

const Home: React.FC = () => {
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [registradas, setRegistradas] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mostrarToast, setMostrarToast] = useState(false);
  const router = useIonRouter();

  async function cargar() {
    setCargando(true);
    setError('');
    try {
      const datos = await obtenerComidas();
      setComidas(datos);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  // Borra el token y vuelve al login. 'root' limpia el historial para que
  // "atrás" no regrese a una pantalla que ya no tiene sesión.
  async function salir() {
    await cerrarSesion();
    router.push('/login', 'root', 'replace');
  }

  // Pasado al formulario: así Home es la única que toca el estado de la lista.
  async function agregar(comida: NuevaComida): Promise<boolean> {
    try {
      const nueva = await crearComida(comida);
      setComidas([...comidas, nueva]);
      setRegistradas(registradas + 1);
      setMostrarToast(true);
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NutriTrack</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={salir}>Cerrar sesión</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <FormularioComida onAgregar={agregar} />

        <IonText>
          <p>Comidas registradas en esta sesión: {registradas}</p>
        </IonText>

        {error && <MensajeError mensaje={error} onReintentar={cargar} />}

        {/* Un estado a la vez: cargando, o error sin datos (solo el mensaje),
            o datos (la lista, que si está vacía muestra su propio aviso). */}
        {cargando ? (
          <IonText>
            <p><IonSpinner name="dots" /> Cargando...</p>
          </IonText>
        ) : (
          (!error || comidas.length > 0) && <ListaComidas comidas={comidas} />
        )}

        <IonToast
          isOpen={mostrarToast}
          message="Comida registrada correctamente"
          duration={2000}
          onDidDismiss={() => setMostrarToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;