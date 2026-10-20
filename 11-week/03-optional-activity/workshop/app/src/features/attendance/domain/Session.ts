export type MuscleGroup = 'CHEST' | 'BACK' | 'LEGS' | 'ARMS' | 'SHOULDERS' | 'CORE';

export interface Session {
  id: string;
  studentId: string;
  checkInAt: string;
  checkOutAt: string;
  durationMinutes: number;
  muscleGroups: MuscleGroup[];
}

export const MUSCLE_LABELS: Record<MuscleGroup, string> = {
  CHEST: 'Pecho',
  BACK: 'Espalda',
  LEGS: 'Piernas',
  ARMS: 'Brazos',
  SHOULDERS: 'Hombros',
  CORE: 'Core',
};

export type ActiveSession = Omit<Session, 'checkOutAt' | 'durationMinutes'> & {
  checkOutAt: null;
  durationMinutes: null;
};