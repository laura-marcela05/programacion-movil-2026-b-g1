import React from 'react';
import { IonList, IonItem, IonLabel, IonNote, IonText } from '@ionic/react';
import { Comida } from '../services/comidasApi';
import { formatearFecha } from '../utils/formato';

interface Props {
  comidas: Comida[];
}

// Recibe la lista ya cargada y solo se encarga de dibujarla.
// No pide nada a la API, eso lo hace Home.
const ListaComidas: React.FC<Props> = ({ comidas }) => {
  if (comidas.length === 0) {
    return (
      <IonText color="medium">
        <p>Aún no hay comidas registradas.</p>
      </IonText>
    );
  }

  return (
    <IonList>
      {comidas.map((c) => (
        <IonItem key={c.id} routerLink={`/detalle/${c.id}`} detail>
          <IonLabel>
            <h3>{c.descripcion}</h3>
            <p>{formatearFecha(c.fecha)}</p>
          </IonLabel>
          <IonNote slot="end">{c.franja}</IonNote>
        </IonItem>
      ))}
    </IonList>
  );
};

// React.memo: no vuelve a dibujar la lista si `comidas` no cambió
// (por ejemplo, cuando solo se cierra el toast de Home).
export default React.memo(ListaComidas);