import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonToast, IonSpinner } from '@ionic/react';
import { obtenerComidas, crearComida, Comida, NuevaComida } from '../services/comidasApi';
import ListaComidas from '../components/ListaComidas';
import FormularioComida from '../components/FormularioComida';
import MensajeError from '../components/MensajeError';

const Home: React.FC = () => {
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [registradas, setRegistradas] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mostrarToast, setMostrarToast] = useState(false);

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
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <FormularioComida onAgregar={agregar} />

        <IonText>
          <p>Comidas registradas en esta sesión: {registradas}</p>
        </IonText>

        {error && <MensajeError mensaje={error} onReintentar={cargar} />}

        {cargando ? (
          <IonText>
            <p><IonSpinner name="dots" /> Cargando...</p>
          </IonText>
        ) : (
          <ListaComidas comidas={comidas} />
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
