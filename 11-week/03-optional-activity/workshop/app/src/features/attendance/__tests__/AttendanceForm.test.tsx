import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MUSCLE_LABELS, type MuscleGroup } from '../domain/Session';
import { CheckoutForm } from '../presentation/CheckoutForm';

afterEach(cleanup);

const noop = vi.fn();
const renderForm = (selected: MuscleGroup[], actionError = false) =>
  render(<CheckoutForm selected={selected} disabled={false} actionError={actionError} onToggle={noop} onCancel={noop} />);

describe('CheckoutForm, validación del formulario de salida', () => {
  it('muestra el mensaje bajo el campo cuando no hay grupos elegidos', () => {
    renderForm([]);
    expect(screen.getByText('Elige al menos un grupo muscular')).toBeInTheDocument();
  });

  it('oculta el mensaje cuando hay al menos un grupo elegido', () => {
    renderForm(['CHEST']);
    expect(screen.queryByText('Elige al menos un grupo muscular')).toBeNull();
  });

  it('ofrece los seis grupos musculares del catálogo', () => {
    renderForm([]);
    Object.values(MUSCLE_LABELS).forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('muestra el error del servidor en línea y deja el formulario visible', () => {
    renderForm(['CHEST', 'ARMS'], true);
    expect(screen.getByText('No se pudo registrar la salida. Tu selección se conservó, intenta de nuevo.')).toBeInTheDocument();
    expect(screen.getByText('Pecho')).toBeInTheDocument();
  });
});