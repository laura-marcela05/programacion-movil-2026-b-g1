import React, { useState } from 'react';
import { IonContent, IonButton, IonText } from '@ionic/react';

const Saludo: React.FC = () => {
  const [nombre] = useState('Laura');
  const [mostrarSaludo, setMostrarSaludo] = useState(false);

  return (
    <IonContent className="ion-padding">
      {mostrarSaludo && (
        <IonText>
          <h2>Hola, {nombre}!</h2>
        </IonText>
      )}
      <IonButton onClick={() => setMostrarSaludo(true)}>
        Saludar
      </IonButton>
    </IonContent>
  );
};

export default Saludo;
