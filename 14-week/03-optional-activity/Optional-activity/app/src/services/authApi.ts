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
    false // el login es la única ruta pública
  );
  await guardarToken(token);
}

export function cerrarSesion(): Promise<void> {
  return borrarToken();
}
