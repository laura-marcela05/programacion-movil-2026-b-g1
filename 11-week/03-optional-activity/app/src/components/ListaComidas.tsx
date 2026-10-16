import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { Comida } from '../services/comidasApi';
import FranjaBadge from './FranjaBadge';
import './comidas.css';

interface Props {
  comidas: Comida[];
}

function formatearFecha(iso: string): string {
  return new Date(iso).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
}

// Solo dibuja la lista. El caso "sin comidas" lo decide la pantalla
// con el componente EstadoVacio.
// Jerarquía de cada fila: nombre (grande y en negrita) > fecha > franja.
const ListaComidas: React.FC<Props> = ({ comidas }) => (
  <IonList>
    {comidas.map((c) => (
      <IonItem key={c.id} className="fila-comida" routerLink={`/detalle/${c.id}`} detail>
        <IonLabel>
          <h3 className="comida-nombre">{c.descripcion}</h3>
          <p className="comida-fecha">{formatearFecha(c.fecha)}</p>
        </IonLabel>
        <div slot="end">
          <FranjaBadge franja={c.franja} />
        </div>
      </IonItem>
    ))}
  </IonList>
);

export default ListaComidas;
