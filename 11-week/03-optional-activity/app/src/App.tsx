import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, setupIonicReact } from '@ionic/react';
import { listOutline, addCircleOutline, statsChartOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Detalle from './pages/Detalle';
import Registrar from './pages/Registrar';
import Resumen from './pages/Resumen';

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

// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/layout.css';
import './theme/layout.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* Tabs: 3 secciones principales. El detalle es una pantalla "stack" que se abre desde la lista. */}
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/comidas" element={<Home />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/" element={<Navigate to="/comidas" replace />} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="comidas" href="/comidas">
            <IonIcon icon={listOutline} aria-hidden="true" />
            <IonLabel>Comidas</IonLabel>
          </IonTabButton>
          <IonTabButton tab="registrar" href="/registrar">
            <IonIcon icon={addCircleOutline} aria-hidden="true" />
            <IonLabel>Registrar</IonLabel>
          </IonTabButton>
          <IonTabButton tab="resumen" href="/resumen">
            <IonIcon icon={statsChartOutline} aria-hidden="true" />
            <IonLabel>Resumen</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
