import React from 'react';
import { IonBadge } from '@ionic/react';
import './comidas.css';

const COLORES: Record<string, string> = {
  Desayuno: 'warning',
  Almuerzo: 'success',
  Cena: 'tertiary',
};

interface Props {
  franja: string;
}

// Etiqueta de color con la franja escrita. El color ayuda a distinguirlas
// de un vistazo, pero la información también está en el texto, así que no
// depende solo del color (útil con daltonismo o baja visión).
const FranjaBadge: React.FC<Props> = ({ franja }) => (
  <IonBadge className="franja-badge" color={COLORES[franja] ?? 'medium'}>
    {franja}
  </IonBadge>
);

export default FranjaBadge;
