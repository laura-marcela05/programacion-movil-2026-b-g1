import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MUSCLE_LABELS, type MuscleGroup } from '../domain/Session';
import { CheckoutForm } from '../presentation/CheckoutForm';

afterEach(cleanup);

const noop = vi.fn();
const renderForm = (selected: MuscleGroup[], actionError = false) =>
  render(<CheckoutForm selected={selected} disabled={false} actionError={actionError} onToggle={noop} onClear={noop} onCancel={noop} />);

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

  it('explica cómo quitar un grupo marcado', () => {
    renderForm(['CHEST']);
    expect(screen.getByText('Toca un grupo de nuevo para quitarlo.')).toBeInTheDocument();
  });

  it('ofrece limpiar la selección solo cuando hay grupos marcados', () => {
    renderForm([]);
    expect(screen.queryByText('Limpiar selección')).toBeNull();
    cleanup();
    renderForm(['CHEST']);
    expect(screen.getByText('Limpiar selección')).toBeInTheDocument();
  });

  it('limpia la selección al pulsar el botón', () => {
    const onClear = vi.fn();
    render(<CheckoutForm selected={['CHEST']} disabled={false} actionError={false} onToggle={noop} onClear={onClear} onCancel={noop} />);
    fireEvent.click(screen.getByText('Limpiar selección'));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});