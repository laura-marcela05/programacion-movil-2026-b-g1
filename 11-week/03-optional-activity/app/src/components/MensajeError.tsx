import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { alertCircleOutline } from 'ionicons/icons';
import './estados.css';

interface Props {
  mensaje: string;
  onReintentar?: () => void;
}

// Estado "error": mensaje claro y, si se pasa onReintentar, un botón grande.
// role="alert" hace que el lector de pantalla lo lea apenas aparece.
const MensajeError: React.FC<Props> = ({ mensaje, onReintentar }) => (
  <div className="estado" role="alert">
    <IonIcon icon={alertCircleOutline} color="danger" className="estado-icono" aria-hidden="true" />
    <p className="estado-texto">{mensaje}</p>
    {onReintentar && (
      <IonButton fill="outline" onClick={onReintentar}>
        Reintentar
      </IonButton>
    )}
  </div>
);

export default MensajeError;
