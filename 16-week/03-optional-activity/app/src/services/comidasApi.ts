import { pedir } from './api';

export interface Comida {
  id: number;
  franja: string;
  descripcion: string;
  fecha: string;
}

export interface NuevaComida {
  franja: string;
  descripcion: string;
}

// Solo dicen qué endpoint se llama; red, token y errores los maneja api.ts.
export function obtenerComidas(): Promise<Comida[]> {
  return pedir<Comida[]>('/comidas');
}

export function obtenerComida(id: string): Promise<Comida> {
  return pedir<Comida>(`/comidas/${id}`);
}

export function crearComida(comida: NuevaComida): Promise<Comida> {
  return pedir<Comida>('/comidas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comida),
  });
}
