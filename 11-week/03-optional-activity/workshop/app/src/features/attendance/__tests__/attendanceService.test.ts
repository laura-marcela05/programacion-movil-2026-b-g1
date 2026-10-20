import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getActiveSession, registerCheckIn, registerCheckOut } from '../data/attendanceService';

const SERVER_DELAY = 800;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

// Deja correr la demora simulada del servicio y devuelve el resultado.
async function settle<T>(call: Promise<T>): Promise<T> {
  await vi.advanceTimersByTimeAsync(SERVER_DELAY);
  return call;
}

// Igual que settle, pero para llamadas que deben fallar: devuelve el error.
async function failure(call: Promise<unknown>): Promise<unknown> {
  const outcome = call.then(
    () => null,
    (error: unknown) => error,
  );
  await vi.advanceTimersByTimeAsync(SERVER_DELAY);
  return outcome;
}

describe('attendanceService, entrada y salida', () => {
  it('rechaza una segunda entrada con 409 SESSION_ALREADY_ACTIVE (E-05)', async () => {
    await settle(registerCheckIn('student-a'));
    const error = await failure(registerCheckIn('student-a'));
    expect(error).toMatchObject({ status: 409, code: 'SESSION_ALREADY_ACTIVE' });
  });

  it('rechaza la salida sin grupos musculares con 422 MUSCLE_GROUPS_REQUIRED (E-06)', async () => {
    const session = await settle(registerCheckIn('student-b'));
    const error = await failure(registerCheckOut(session.id, []));
    expect(error).toMatchObject({ status: 422, code: 'MUSCLE_GROUPS_REQUIRED' });
  });

  it('responde 409 SESSION_ALREADY_CLOSED si la sesión ya no está abierta (E-06)', async () => {
    const session = await settle(registerCheckIn('student-c'));
    await settle(registerCheckOut(session.id, ['LEGS']));
    const error = await failure(registerCheckOut(session.id, ['LEGS']));
    expect(error).toMatchObject({ status: 409, code: 'SESSION_ALREADY_CLOSED' });
    expect(await settle(getActiveSession('student-c'))).toBeNull();
  });

  it('acepta durationMinutes en 0 cuando la salida es inmediata (D-03)', async () => {
    const session = await settle(registerCheckIn('student-d'));
    const closed = await settle(registerCheckOut(session.id, ['CHEST']));
    expect(closed.durationMinutes).toBe(0);
    expect(closed.muscleGroups).toEqual(['CHEST']);
  });

  it('calcula durationMinutes redondeando hacia abajo (D-03)', async () => {
    const session = await settle(registerCheckIn('student-e'));
    await vi.advanceTimersByTimeAsync(65 * 60 * 1000 + 30 * 1000);
    const closed = await settle(registerCheckOut(session.id, ['BACK', 'CORE']));
    expect(closed.durationMinutes).toBe(65);
  });
});