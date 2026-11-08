import { test, expect } from 'vitest';
import { formatearFecha } from './formato';

test('formatearFecha da dd/mm/aaaa hh:mm en 24 horas', () => {
  expect(formatearFecha('2026-10-01T07:30:00Z', 'UTC')).toBe('01/10/2026 07:30');
  expect(formatearFecha('2026-10-01T12:45:00Z', 'America/Bogota')).toBe('01/10/2026 07:45');
});

test('formatearFecha avisa cuando la fecha no es válida', () => {
  expect(formatearFecha('no es una fecha', 'UTC')).toBe('Fecha inválida');
});