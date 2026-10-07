const API_URL = "http://localhost:3000";

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

// Función central: todas las llamadas a la API pasan por aquí.
// fetch solo lanza error cuando NO logra conectarse (red caída, servidor apagado);
// cuando el servidor responde con 400/404/500, fetch lo considera una respuesta
// normal, así que hay que revisar resp.ok a mano.
async function pedir<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  let resp: Response;

  try {
    resp = await fetch(`${API_URL}${ruta}`, opciones);
  } catch {
    throw new Error("No se pudo conectar con el servidor");
  }

  const datos = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    throw new Error(datos.error || `Error del servidor (${resp.status})`);
  }

  return datos;
}

export function obtenerComidas(): Promise<Comida[]> {
  return pedir<Comida[]>("/comidas");
}

export function obtenerComida(id: string): Promise<Comida> {
  return pedir<Comida>(`/comidas/${id}`);
}

export function crearComida(comida: NuevaComida): Promise<Comida> {
  return pedir<Comida>("/comidas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comida),
  });
}
