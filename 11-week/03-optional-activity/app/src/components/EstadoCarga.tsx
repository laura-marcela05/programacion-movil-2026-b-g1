import React from 'react';
import { IonSpinner } from '@ionic/react';
import './estados.css';

interface Props {
  mensaje?: string;
}

// Estado "cargando": spinner + texto.
// role="status" hace que el lector de pantalla anuncie el mensaje.
const EstadoCarga: React.FC<Props> = ({ mensaje = 'Cargando...' }) => (
  <div className="estado" role="status">
    <IonSpinner name="crescent" color="primary" aria-hidden="true" />
    <p className="estado-texto">{mensaje}</p>
  </div>
);

export default EstadoCarga;
