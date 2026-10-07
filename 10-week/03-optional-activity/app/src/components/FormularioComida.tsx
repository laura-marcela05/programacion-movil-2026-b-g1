import React, { useState } from 'react';
import { IonItem, IonSelect, IonSelectOption, IonInput, IonButton, IonSpinner } from '@ionic/react';
import { NuevaComida } from '../services/comidasApi';
import MensajeError from './MensajeError';

interface Props {
  // Home decide qué hacer con el dato (llamar la API); el formulario
  // solo junta los campos y avisa si quedó guardado o no.
  onAgregar: (comida: NuevaComida) => Promise<boolean>;
}

const FormularioComida: React.FC<Props> = ({ onAgregar }) => {
  const [franja, setFranja] = useState('Desayuno');
  const [descripcion, setDescripcion] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [errorLocal, setErrorLocal] = useState('');

  async function manejarEnvio() {
    if (!descripcion.trim()) {
      setErrorLocal('Escribe una descripción antes de registrar');
      return;
    }

    setErrorLocal('');
    setGuardando(true);
    const exito = await onAgregar({ franja, descripcion });
    setGuardando(false);

    // Si falló, se deja lo escrito para no perderlo.
    if (exito) {
      setDescripcion('');
    }
  }

  return (
    <>
      <IonItem>
        <IonSelect value={franja} onIonChange={(e) => setFranja(e.detail.value)}>
          <IonSelectOption value="Desayuno">Desayuno</IonSelectOption>
          <IonSelectOption value="Almuerzo">Almuerzo</IonSelectOption>
          <IonSelectOption value="Cena">Cena</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonInput
          placeholder="¿Qué comiste?"
          value={descripcion}
          onIonInput={(e) => setDescripcion(e.detail.value || '')}
        />
      </IonItem>

      <IonButton expand="block" onClick={manejarEnvio} disabled={guardando}>
        {guardando ? <IonSpinner name="dots" /> : 'Registrar comida'}
      </IonButton>

      {errorLocal && <MensajeError mensaje={errorLocal} />}
    </>
  );
};

export default FormularioComida;
