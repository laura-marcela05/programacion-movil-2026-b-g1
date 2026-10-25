import React, { useState } from 'react';
import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { tomarFotoDeComida } from '../services/fotoService';
import MensajeError from './MensajeError';
import './FotoComida.css';

interface Props {
  foto: string | null;
  onCambio: (uri: string | null) => void;
}

const MENSAJE_DENEGADO =
  'No diste permiso para usar la cámara, así que no podemos tomar la foto de tu comida. ' +
  'Puedes activarlo en Ajustes > Aplicaciones > NutriTrack > Permisos > Cámara y volver a tocar el botón. ' +
  'Mientras tanto puedes registrar la comida sin foto.';

const FotoComida: React.FC<Props> = ({ foto, onCambio }) => {
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  async function tomar() {
    setCargando(true);
    setMensaje('');

    const resultado = await tomarFotoDeComida();

    setCargando(false);

    if (resultado.tipo === 'ok') {
      onCambio(resultado.uri);
    } else if (resultado.tipo === 'denegado') {
      setMensaje(MENSAJE_DENEGADO);
    } else if (resultado.tipo === 'error') {
      setMensaje(resultado.mensaje);
    }
    // 'cancelado': el usuario cerró la cámara a propósito, no se muestra nada
  }

  return (
    <div className="foto-comida">
      {foto && <img className="foto-comida__imagen" src={foto} alt="Foto de la comida" />}

      <IonButton
        className="foto-comida__boton"
        expand="block"
        fill="outline"
        onClick={tomar}
        disabled={cargando}
      >
        {cargando ? (
          <IonSpinner name="dots" />
        ) : (
          <>
            <IonIcon slot="start" icon={camera} aria-hidden="true" />
            {foto ? 'Tomar otra foto' : 'Tomar foto de la comida'}
          </>
        )}
      </IonButton>

      {foto && (
        <IonButton expand="block" fill="clear" color="medium" onClick={() => onCambio(null)}>
          Quitar foto
        </IonButton>
      )}

      {mensaje && <MensajeError mensaje={mensaje} />}
    </div>
  );
};

export default FotoComida;
