import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSessionDetail } from '../presentation/useSessionDetail';

const settle = () =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(800);
  });

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  window.history.replaceState(null, '', '/');
});

describe('useSessionDetail, estados del detalle', () => {
  it('pasa de cargando a listo con los datos de la sesión', async () => {
    const { result } = renderHook(() => useSessionDetail('demo-student', 'ses-2'));
    expect(result.current.status).toBe('loading');
    await settle();
    expect(result.current.status).toBe('ready');
    expect(result.current.session).toMatchObject({ id: 'ses-2', durationMinutes: 65, muscleGroups: ['LEGS'] });
  });

  it('responde notFound cuando la sesión no existe (404 SESSION_NOT_FOUND)', async () => {
    const { result } = renderHook(() => useSessionDetail('demo-student', 'ses-99'));
    await settle();
    expect(result.current.status).toBe('notFound');
    expect(result.current.session).toBeNull();
  });

  it('responde error ante una falla que no es 404', async () => {
    window.history.replaceState(null, '', '/?sim=error');
    const { result } = renderHook(() => useSessionDetail('demo-student', 'ses-1'));
    await settle();
    expect(result.current.status).toBe('error');
  });

  it('vuelve a cargar los datos al reintentar tras un error', async () => {
    window.history.replaceState(null, '', '/?sim=error');
    const { result } = renderHook(() => useSessionDetail('demo-student', 'ses-1'));
    await settle();
    expect(result.current.status).toBe('error');
    window.history.replaceState(null, '', '/');
    await act(async () => {
      const retry = result.current.reload();
      await vi.advanceTimersByTimeAsync(800);
      await retry;
    });
    expect(result.current.status).toBe('ready');
  });
});