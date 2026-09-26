# Backend básico para NutriTrack — API REST con Express

## Qué se entregó

- `server.js`: API Express con dos endpoints para la entidad **comidas**.
- `api-comidas.ts`: funciones `fetch` para consumir la API desde la app (Ionic React), con manejo de errores.

## Endpoints

| Método | Ruta | Acción |
|---|---|---|
| GET | `/comidas` | Lista todas las comidas registradas |
| POST | `/comidas` | Crea una nueva comida (requiere `franja` y `descripcion`) |

## Cómo correrlo

```
npm init -y
npm install express
node server.js
```

La API queda disponible en `http://localhost:3000`.

## Pruebas realizadas

**GET /comidas (antes de crear nada nuevo):**
```json
[{"id":1,"franja":"Desayuno","descripcion":"Avena con fruta"}]
```

**POST /comidas** con body `{"franja":"Almuerzo","descripcion":"Arroz con pollo"}`:
```json
{"id":2,"franja":"Almuerzo","descripcion":"Arroz con pollo"}
```
Responde con código `201 Created`.

**GET /comidas (después del POST):**
```json
[
  {"id":1,"franja":"Desayuno","descripcion":"Avena con fruta"},
  {"id":2,"franja":"Almuerzo","descripcion":"Arroz con pollo"}
]
```

**POST /comidas** sin `descripcion` (caso de error, body `{"franja":"Cena"}`):
```json
{"error":"Franja y descripción son obligatorios"}
```
Responde con código `400 Bad Request`.

Estas pruebas se hicieron con `curl` desde la terminal; también se pueden repetir con Postman, Thunder Client, o directamente en el navegador para el GET.

## Consumo desde la app

Las funciones `obtenerComidas()` y `crearComida()` en `api-comidas.ts` usan `fetch` para hablar con la API. Ambas están envueltas en `try/catch`: si la petición falla (por ejemplo, si el servidor no está corriendo), el error se registra en consola y la función devuelve un valor seguro (`[]` o `null`) en vez de romper la app.
