import React from 'react';
import { IonIcon } from '@ionic/react';
import { restaurantOutline } from 'ionicons/icons';
import './estados.css';

interface Props {
  titulo: string;
  mensaje: string;
}

// Estado "vacío": la petición salió bien, pero no hay nada que mostrar.
// Explica qué pasa y qué hacer, en vez de dejar la pantalla en blanco.
const EstadoVacio: React.FC<Props> = ({ titulo, mensaje }) => (
  <div className="estado">
    <IonIcon icon={restaurantOutline} color="medium" className="estado-icono" aria-hidden="true" />
    <h2 className="estado-titulo">{titulo}</h2>
    <p className="estado-texto">{mensaje}</p>
  </div>
);

export default EstadoVacio;
