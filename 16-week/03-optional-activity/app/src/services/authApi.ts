import { pedir } from './api';
import { guardarToken, borrarToken } from './tokenStorage';

export async function iniciarSesion(correo: string, clave: string): Promise<void> {
  const { token } = await pedir<{ token: string }>(
    '/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, clave }),
    },
    false // el login es público
  );
  await guardarToken(token);
}

export async function registrarse(
  nombre: string,
  correo: string,
  clave: string,
  objetivo: string
): Promise<void> {
  await pedir<{ mensaje: string }>(
    '/registro',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, clave, objetivo }),
    },
    false // el registro es público, igual que el login
  );
  await iniciarSesion(correo, clave);
}

export function cerrarSesion(): Promise<void> {
  return borrarToken();
}