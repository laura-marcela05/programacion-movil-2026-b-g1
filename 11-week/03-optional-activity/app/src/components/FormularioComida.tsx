import React, { useState } from 'react';
import { IonItem, IonSelect, IonSelectOption, IonInput, IonButton, IonSpinner } from '@ionic/react';
import { NuevaComida } from '../services/comidasApi';
import MensajeError from './MensajeError';
import './comidas.css';

interface Props {
  // La pantalla decide qué hacer con el dato (llamar la API); el formulario
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
      setErrorLocal('Escribe qué comiste antes de registrar');
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
    <div className="formulario-comida">
      {/* Cada campo tiene una etiqueta visible (label): así el lector de
          pantalla sabe qué es, y el placeholder deja de ser la única pista. */}
      <IonItem>
        <IonSelect
          label="Franja del día"
          labelPlacement="stacked"
          value={franja}
          onIonChange={(e) => setFranja(e.detail.value)}
        >
          <IonSelectOption value="Desayuno">Desayuno</IonSelectOption>
          <IonSelectOption value="Almuerzo">Almuerzo</IonSelectOption>
          <IonSelectOption value="Cena">Cena</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonInput
          label="¿Qué comiste?"
          labelPlacement="stacked"
          placeholder="Ej: arroz con pollo y ensalada"
          value={descripcion}
          onIonInput={(e) => setDescripcion(e.detail.value || '')}
        />
      </IonItem>

      <IonButton expand="block" size="large" onClick={manejarEnvio} disabled={guardando}>
        {guardando ? <IonSpinner name="dots" aria-label="Guardando" /> : 'Registrar comida'}
      </IonButton>

      {errorLocal && <MensajeError mensaje={errorLocal} />}
    </div>
  );
};

export default FormularioComida;
