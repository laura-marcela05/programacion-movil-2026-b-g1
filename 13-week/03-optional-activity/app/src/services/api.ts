import { Network } from '@capacitor/network';
import { leerToken, borrarToken } from './tokenStorage';

// Único lugar de la app que llama a fetch: URL, token y errores viven aquí.
const API_URL = 'http://localhost:3000';

export type MotivoSesion = 'vencida' | 'sin-token';

let alPerderSesion: (motivo: MotivoSesion) => void = () => {};

// El servicio no sabe de pantallas: solo avisa. App.tsx decide qué hacer.
export function cuandoSePierdaLaSesion(callback: (motivo: MotivoSesion) => void): void {
  alPerderSesion = callback;
}

// conToken = false solo para rutas públicas (login).
export async function pedir<T>(
  ruta: string,
  opciones: RequestInit = {},
  conToken = true
): Promise<T> {
  // 1. Sin red: se avisa antes de intentar la petición
  const red = await Network.getStatus();
  if (!red.connected) {
    throw new Error('No tienes conexión a internet. Revisa tu wifi o tus datos móviles y vuelve a intentar.');
  }

  // 2. El token va en la cabecera Authorization: Bearer <token>
  const cabeceras = new Headers(opciones.headers);
  if (conToken) {
    const token = await leerToken();
    if (!token) {
      alPerderSesion('sin-token');
      throw new Error('Inicia sesión para continuar.');
    }
    cabeceras.set('Authorization', `Bearer ${token}`);
  }

  // 3. fetch lanza error cuando NO logra conectarse (hay red, pero el servidor no responde)
  let resp: Response;
  try {
    resp = await fetch(`${API_URL}${ruta}`, { ...opciones, headers: cabeceras });
  } catch {
    throw new Error('El servidor no responde. Intenta de nuevo en unos minutos.');
  }

  const datos = await resp.json().catch(() => ({}));

  // 4. 401 en ruta protegida: token vencido o inválido -> se borra y se vuelve al login
  if (resp.status === 401 && conToken) {
    await borrarToken();
    alPerderSesion('vencida');
    throw new Error('Tu sesión venció. Inicia sesión de nuevo.');
  }

  // 5. Otros errores (400, 404, 500): fetch no lanza, hay que revisar resp.ok
  if (!resp.ok) {
    throw new Error(datos.error || `Error del servidor (${resp.status})`);
  }

  return datos as T;
}
