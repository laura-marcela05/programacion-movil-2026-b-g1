import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { useComidas } from '../hooks/useComidas';
import ListaComidas from '../components/ListaComidas';
import MensajeError from '../components/MensajeError';
import EstadoCarga from '../components/EstadoCarga';
import EstadoVacio from '../components/EstadoVacio';

// Pestaña "Comidas": su único objetivo es ver lo que has comido.
// Registrar una comida ahora vive en su propia pestaña.
const Home: React.FC = () => {
  const { comidas, cargando, error, cargar } = useComidas();

  // Siempre se muestra exactamente un estado, nunca una pantalla en blanco.
  // El orden importa: el vacío solo aplica si la petición salió bien.
  function contenido() {
    if (cargando) {
      return <EstadoCarga mensaje="Cargando tus comidas..." />;
    }
    if (error) {
      return <MensajeError mensaje={error} onReintentar={cargar} />;
    }
    if (comidas.length === 0) {
      return (
        <EstadoVacio
          titulo="Aún no has registrado comidas"
          mensaje="Ve a la pestaña Registrar para agregar la primera."
        />
      );
    }
    return <ListaComidas comidas={comidas} />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis comidas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="contenedor">{contenido()}</div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
