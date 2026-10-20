import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import './theme/variables.css';
import AttendanceHistoryPage from '../features/attendance/presentation/AttendanceHistoryPage';
import AttendanceFormPage from '../features/attendance/presentation/AttendanceFormPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/students/:studentId/history" component={AttendanceHistoryPage} />
        <Route exact path="/students/:studentId/attendance" component={AttendanceFormPage} />
        <Redirect exact from="/" to="/students/demo-student/history" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export { App };
export default App;