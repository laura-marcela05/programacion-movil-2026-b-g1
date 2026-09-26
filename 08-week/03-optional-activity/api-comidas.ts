const BASE_URL = "http://localhost:3000";

// Lista todas las comidas registradas
export async function obtenerComidas() {
  try {
    const resp = await fetch(`${BASE_URL}/comidas`);

    if (!resp.ok) {
      throw new Error(`Error al obtener comidas: ${resp.status}`);
    }

    const datos = await resp.json();
    return datos;
  } catch (error) {
    console.error("No se pudieron cargar las comidas:", error);
    return [];
  }
}

// Crea una nueva comida
export async function crearComida(franja: string, descripcion: string) {
  try {
    const resp = await fetch(`${BASE_URL}/comidas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ franja, descripcion }),
    });

    if (!resp.ok) {
      throw new Error(`Error al crear la comida: ${resp.status}`);
    }

    const nuevaComida = await resp.json();
    return nuevaComida;
  } catch (error) {
    console.error("No se pudo guardar la comida:", error);
    return null;
  }
}
