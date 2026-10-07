import React from 'react';
import { IonText, IonButton } from '@ionic/react';

interface Props {
  mensaje: string;
  onReintentar?: () => void;
}

// Pieza reutilizable: recibe un mensaje y lo muestra. No sabe nada de
// fetch ni de la API, solo de cómo dibujar un error.
const MensajeError: React.FC<Props> = ({ mensaje, onReintentar }) => (
  <IonText color="danger">
    <p>
      {mensaje}
      {onReintentar && (
        <IonButton size="small" fill="outline" onClick={onReintentar} style={{ marginLeft: 8 }}>
          Reintentar
        </IonButton>
      )}
    </p>
  </IonText>
);

export default MensajeError;
