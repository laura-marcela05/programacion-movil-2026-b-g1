import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge } from '@ionic/react';
import { useComidas } from '../hooks/useComidas';
import MensajeError from '../components/MensajeError';
import EstadoCarga from '../components/EstadoCarga';
import EstadoVacio from '../components/EstadoVacio';
import './Resumen.css';

const FRANJAS = ['Desayuno', 'Almuerzo', 'Cena'];

// Pestaña "Resumen": cuántas comidas hay en total y por franja.
const Resumen: React.FC = () => {
  const { comidas, cargando, error, cargar } = useComidas();

  function contenido() {
    if (cargando) {
      return <EstadoCarga mensaje="Calculando tu resumen..." />;
    }
    if (error) {
      return <MensajeError mensaje={error} onReintentar={cargar} />;
    }
    if (comidas.length === 0) {
      return (
        <EstadoVacio
          titulo="Todavía no hay nada que resumir"
          mensaje="Registra tu primera comida y aquí verás cuántas llevas."
        />
      );
    }
    return (
      <>
        <div className="resumen-total">
          <span className="resumen-numero">{comidas.length}</span>
          <span className="resumen-etiqueta">comidas registradas</span>
        </div>
        <IonList>
          {FRANJAS.map((franja) => (
            <IonItem key={franja} className="resumen-fila">
              <IonLabel>{franja}</IonLabel>
              <IonBadge slot="end" color="primary">
                {comidas.filter((c) => c.franja === franja).length}
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      </>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resumen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="contenedor">{contenido()}</div>
      </IonContent>
    </IonPage>
  );
};

export default Resumen;
