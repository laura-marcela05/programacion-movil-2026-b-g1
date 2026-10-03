const BASE_URL = "http://localhost:3000";

// Lista todas las comidas registradas
export async function obtenerComidas() {
  const resp = await fetch(`${BASE_URL}/comidas`);

  if (!resp.ok) {
    throw new Error(`Error al obtener comidas: ${resp.status}`);
  }

  return resp.json();
}

// Trae una sola comida por su id (para la pantalla de detalle)
export async function obtenerComida(id: string) {
  const resp = await fetch(`${BASE_URL}/comidas/${id}`);

  if (!resp.ok) {
    throw new Error(`Error al obtener la comida: ${resp.status}`);
  }

  return resp.json();
}

// Crea una nueva comida
export async function crearComida(franja: string, descripcion: string) {
  const resp = await fetch(`${BASE_URL}/comidas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ franja, descripcion }),
  });

  if (!resp.ok) {
    throw new Error(`Error al crear la comida: ${resp.status}`);
  }

  return resp.json();
}
