import type { ActiveSession, MuscleGroup, Session } from '../domain/Session';

type Simulation = 'slow' | 'error' | 'empty' | 'conflict' | null;

const samples = (studentId: string): Session[] => [
  { id: 'ses-3', studentId, checkInAt: '2026-09-05T18:00:00-05:00', checkOutAt: '2026-09-05T19:10:00-05:00', durationMinutes: 70, muscleGroups: ['CHEST', 'BACK'] },
  { id: 'ses-2', studentId, checkInAt: '2026-09-03T18:15:00-05:00', checkOutAt: '2026-09-03T19:20:00-05:00', durationMinutes: 65, muscleGroups: ['LEGS'] },
  { id: 'ses-1', studentId, checkInAt: '2026-09-01T18:00:00-05:00', checkOutAt: '2026-09-01T19:00:00-05:00', durationMinutes: 60, muscleGroups: ['ARMS', 'SHOULDERS'] },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function readSimulation(): Simulation {
  const value = new URLSearchParams(window.location.search).get('sim');
  return value === 'slow' || value === 'error' || value === 'empty' || value === 'conflict' ? value : null;
}

export async function getSessionHistory(studentId: string): Promise<Session[]> {
  const sim = readSimulation();
  await wait(sim === 'slow' ? 4000 : 800);
  if (sim === 'error') throw new Error('SIMULATED_FAILURE');
  return sim === 'empty' ? [] : samples(studentId);
}


export class AttendanceApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string) {
    super(code);
    this.status = status;
    this.code = code;
  }
}

const activeSessions = new Map<string, ActiveSession>();

const delay = () => wait(readSimulation() === 'slow' ? 4000 : 800);

export async function getActiveSession(studentId: string): Promise<ActiveSession | null> {
  await delay();
  if (readSimulation() === 'error') throw new Error('SIMULATED_FAILURE');
  return activeSessions.get(studentId) ?? null;
}

export async function registerCheckIn(studentId: string): Promise<ActiveSession> {
  await delay();
  const sim = readSimulation();
  if (sim === 'error') throw new Error('SIMULATED_FAILURE');
  const session: ActiveSession = {
    id: `ses-${Date.now()}`,
    studentId,
    checkInAt: new Date().toISOString(),
    checkOutAt: null,
    durationMinutes: null,
    muscleGroups: [],
  };
  if (sim === 'conflict' || activeSessions.has(studentId)) {
    if (!activeSessions.has(studentId)) activeSessions.set(studentId, session);
    throw new AttendanceApiError(409, 'SESSION_ALREADY_ACTIVE');
  }
  activeSessions.set(studentId, session);
  return session;
}

export async function registerCheckOut(sessionId: string, muscleGroups: MuscleGroup[]): Promise<Session> {
  await delay();
  const sim = readSimulation();
  if (sim === 'error') throw new Error('SIMULATED_FAILURE');
  const active = [...activeSessions.values()].find((s) => s.id === sessionId);
  if (sim === 'conflict' || !active) {
    if (active) activeSessions.delete(active.studentId);
    throw new AttendanceApiError(409, 'SESSION_ALREADY_CLOSED');
  }
  if (muscleGroups.length === 0) throw new AttendanceApiError(422, 'MUSCLE_GROUPS_REQUIRED');
  const checkOutAt = new Date();
  const durationMinutes = Math.floor((checkOutAt.getTime() - new Date(active.checkInAt).getTime()) / 60000);
  activeSessions.delete(active.studentId);
  return { ...active, checkOutAt: checkOutAt.toISOString(), durationMinutes, muscleGroups };
}

export async function getSessionDetail(studentId: string, sessionId: string): Promise<Session> {
  await delay();
  if (readSimulation() === 'error') throw new Error('SIMULATED_FAILURE');
  const found = samples(studentId).find((s) => s.id === sessionId);
  if (!found) throw new AttendanceApiError(404, 'SESSION_NOT_FOUND');
  return found;
}