import { IonButton, IonCheckbox, IonItem, IonList, IonNote } from '@ionic/react';
import { MUSCLE_LABELS, type MuscleGroup } from '../domain/Session';

interface Props {
  selected: MuscleGroup[];
  disabled: boolean;
  actionError: boolean;
  onToggle: (group: MuscleGroup) => void;
  onCancel: () => void;
}

const groups = Object.keys(MUSCLE_LABELS) as MuscleGroup[];

export function CheckoutForm({ selected, disabled, actionError, onToggle, onCancel }: Props) {
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend style={{ fontSize: 'var(--ht-font-lg)', marginBottom: 'var(--ht-space-2)' }}>
        Grupos musculares trabajados
      </legend>
      <IonList>
        {groups.map((g) => (
          <IonItem key={g}>
            <IonCheckbox checked={selected.includes(g)} disabled={disabled} onIonChange={() => onToggle(g)}>
              {MUSCLE_LABELS[g]}
            </IonCheckbox>
          </IonItem>
        ))}
      </IonList>
      {selected.length === 0 && (
        <IonNote color="danger" aria-live="polite" style={{ display: 'block', padding: 'var(--ht-space-2)' }}>
          Elige al menos un grupo muscular
        </IonNote>
      )}
      {actionError && (
        <p role="alert" style={{ color: 'var(--ht-danger)' }}>
          No se pudo registrar la salida. Tu selección se conservó, intenta de nuevo.
        </p>
      )}
      <IonButton fill="clear" disabled={disabled} onClick={onCancel} style={{ minHeight: 'var(--ht-touch-min)' }}>
        Cancelar
      </IonButton>
    </fieldset>
  );
}