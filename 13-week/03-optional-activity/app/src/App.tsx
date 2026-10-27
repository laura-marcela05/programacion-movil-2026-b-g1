import { Navigate, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Detalle from './pages/Detalle';
import Login from './pages/Login';
import { cuandoSePierdaLaSesion } from './services/api';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

// El servicio api.ts solo avisa que se perdió la sesión; aquí se decide qué hacer.
// 'root' limpia el historial para que "atrás" no regrese a una pantalla sin datos.
const VigilanteSesion: React.FC = () => {
  const router = useIonRouter();
  useEffect(() => {
    cuandoSePierdaLaSesion((motivo) => {
      router.push(motivo === 'vencida' ? '/login?motivo=vencida' : '/login', 'root', 'replace');
    });
  }, [router]);
  return null;
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <VigilanteSesion />
      <IonRouterOutlet>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
