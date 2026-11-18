import { test, expect } from 'vitest';
import { agruparPorDia } from './resumen';

const hoy = new Date('2026-11-14T15:00:00Z');

test('agruparPorDia devuelve 7 días y reparte las comidas en su día', () => {
  const comidas = [
    { id: 1, franja: 'Desayuno', descripcion: 'avena', fecha: '2026-11-14T08:00:00Z' },
    { id: 2, franja: 'Almuerzo', descripcion: 'arroz', fecha: '2026-11-14T12:00:00Z' },
    { id: 3, franja: 'Cena', descripcion: 'sopa', fecha: '2026-11-12T19:00:00Z' },
    { id: 4, franja: 'Cena', descripcion: 'vieja', fecha: '2026-11-01T19:00:00Z' },
  ];
  const resumen = agruparPorDia(comidas, hoy, 'UTC');

  expect(resumen).toHaveLength(7);
  expect(resumen[0].dia).toBe('2026-11-08');
  expect(resumen[6].dia).toBe('2026-11-14');
  expect(resumen[6].comidas).toHaveLength(2);
  expect(resumen.find((d) => d.dia === '2026-11-12')?.comidas).toHaveLength(1);
  // la comida del 1 de noviembre queda fuera de los 7 días
  expect(resumen.reduce((total, d) => total + d.comidas.length, 0)).toBe(3);
});

test('agruparPorDia deja vacíos los días sin registros e ignora fechas inválidas', () => {
  const resumen = agruparPorDia(
    [{ id: 9, franja: 'Cena', descripcion: 'x', fecha: 'no es fecha' }],
    hoy,
    'UTC'
  );

  expect(resumen).toHaveLength(7);
  expect(resumen.every((d) => d.comidas.length === 0)).toBe(true);
});