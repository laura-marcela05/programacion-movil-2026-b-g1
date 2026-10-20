import type { Session } from '../domain/Session';

type Simulation = 'slow' | 'error' | 'empty' | null;

const samples = (studentId: string): Session[] => [
  { id: 'ses-3', studentId, checkInAt: '2026-09-05T18:00:00-05:00', checkOutAt: '2026-09-05T19:10:00-05:00', durationMinutes: 70, muscleGroups: ['CHEST', 'BACK'] },
  { id: 'ses-2', studentId, checkInAt: '2026-09-03T18:15:00-05:00', checkOutAt: '2026-09-03T19:20:00-05:00', durationMinutes: 65, muscleGroups: ['LEGS'] },
  { id: 'ses-1', studentId, checkInAt: '2026-09-01T18:00:00-05:00', checkOutAt: '2026-09-01T19:00:00-05:00', durationMinutes: 60, muscleGroups: ['ARMS', 'SHOULDERS'] },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function readSimulation(): Simulation {
  const value = new URLSearchParams(window.location.search).get('sim');
  return value === 'slow' || value === 'error' || value === 'empty' ? value : null;
}

export async function getSessionHistory(studentId: string): Promise<Session[]> {
  const sim = readSimulation();
  await wait(sim === 'slow' ? 4000 : 800);
  if (sim === 'error') throw new Error('SIMULATED_FAILURE');
  return sim === 'empty' ? [] : samples(studentId);
}