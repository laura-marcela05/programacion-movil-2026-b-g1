# Semana 10 · NutriTrack: mini-app integradora del Corte 2

Asignatura: Programación Móvil

## Descripción

Para cerrar el Corte 2 se armó la pantalla de comidas de NutriTrack funcionando de punta a punta: una API con Node.js y Express que guarda y entrega las comidas en JSON, y una app Ionic React que las lista, agrega una nueva desde un formulario y abre cada una en una pantalla de detalle.

Respecto a las entregas de las semanas 8 y 9, esta vez el código quedó reorganizado en capas más pequeñas: el backend separa rutas y datos en archivos distintos, y la app separa la lista, el formulario y el manejo de errores en componentes aparte, en vez de tenerlo todo junto en `Home.tsx`.

## Estructura

```
api/
├── package.json
├── server.js              -> configura y enciende el servidor
├── routes/
│   └── comidas.js          -> endpoints GET y POST de /comidas
└── data/
    └── comidas.js           -> datos de prueba en memoria
app/
└── src/
    ├── App.tsx                    -> rutas: /home y /detalle/:id
    ├── services/
    │   └── comidasApi.ts          -> todas las llamadas fetch a la API
    ├── components/
    │   ├── ListaComidas.tsx        -> lista de comidas
    │   ├── FormularioComida.tsx    -> formulario para agregar una comida
    │   └── MensajeError.tsx        -> mensaje de error con botón "Reintentar"
    └── pages/
        ├── Home.tsx                -> pantalla principal: lista + formulario
        └── Detalle.tsx              -> pantalla de detalle de una comida
capturas/                            -> evidencias
```

Cada carpeta tiene una sola responsabilidad: `api/routes` recibe las peticiones y responde, `api/data` guarda los datos, `app/src/services` es el único lugar de la app donde aparece `fetch`, `app/src/components` son piezas de interfaz que reciben datos y los muestran, y `app/src/pages` son las pantallas, que guardan el estado y juntan los componentes.

## Cómo se comunican la app y la API

```
App Ionic React (puerto 8100)                          API Express (puerto 3000)

pages  ->  services/comidasApi.ts  -- HTTP + JSON -->  routes/comidas.js  ->  data/comidas.js
```

La app no tiene ninguna comida escrita en el código. Cada vez que necesita datos se los pide a la API con `fetch`, la API responde en JSON y la pantalla guarda esa respuesta en su estado para dibujarla.

## 1. El backend

La API expone la entidad `Comida` con estos endpoints:

| Método | Ruta | Cuerpo (JSON) | Respuesta |
|---|---|---|---|
| GET | `/comidas` | — | 200 con la lista de comidas |
| GET | `/comidas/:id` | — | 200 con una comida, o 404 con `{ "error": "Comida no encontrada" }` |
| POST | `/comidas` | `{ "franja": "...", "descripcion": "..." }` | 201 con la comida creada |
| POST | `/comidas` con un campo vacío | `{ "franja": "" }` | 400 con `{ "error": "La franja y la descripción son obligatorias" }` |

`server.js` solo prepara el servidor y conecta las rutas:

```js
app.use(cors());          // permite que la app (puerto 8100) llame a la API (puerto 3000)
app.use(express.json());  // permite leer el cuerpo JSON de las peticiones

app.use("/comidas", comidasRoutes);
```

Los endpoints están en `routes/comidas.js`. El `GET` devuelve el arreglo completo y el `POST` revisa los datos antes de guardarlos. El servidor es quien pone el `id` y la `fecha`. El `GET /comidas/:id` existe porque la pantalla de detalle pide a la API la comida que va a mostrar. Los datos viven en un arreglo en memoria (`data/comidas.js`), así que se reinician al apagar el servidor.

## 2. Listar las comidas

`Home.tsx` pide la lista una sola vez, cuando la pantalla se abre, y la guarda en el estado:

```tsx
const [comidas, setComidas] = useState<Comida[]>([]);

useEffect(() => {
  cargar();
}, []);
```

`ListaComidas.tsx` recibe esa lista y la dibuja con `IonList`. Cada elemento muestra la descripción, la fecha y la franja, lleva su `key` y tiene un `routerLink` hacia su detalle.

## 3. Agregar una comida desde el formulario

`FormularioComida.tsx` tiene dos campos (franja y descripción) y el botón "Registrar comida". Al enviarlo, `Home` manda los datos a la API y agrega a la lista la comida que la API devuelve:

```tsx
async function agregar(comida: NuevaComida): Promise<boolean> {
  try {
    const nueva = await crearComida(comida);
    setComidas([...comidas, nueva]);
    setRegistradas(registradas + 1);
    setMostrarToast(true);
    return true;
  } catch (e) {
    setError((e as Error).message);
    return false;
  }
}
```

Como la lista está en `useState`, al actualizarla React vuelve a dibujarla y la comida nueva aparece al final sin recargar la página. Los campos solo se limpian si la comida se guardó; si falló, lo escrito se conserva.

## 4. Navegación al detalle

Las rutas están en `App.tsx`:

```tsx
<Route path="/home" element={<Home />} />
<Route path="/detalle/:id" element={<Detalle />} />
```

Cada `IonItem` de la lista tiene `routerLink="/detalle/<id>"`. `Detalle.tsx` lee el `id` de la ruta con `useParams()` y lo pide con `obtenerComida(id)`. El `IonBackButton` de la barra superior regresa a la lista.

## 5. Manejo de errores de red

Una petición puede fallar de dos formas, y `fetch` solo avisa de una: lanza un error cuando no logra conectarse, pero no cuando el servidor responde con un código 400, 404 o 500. Por eso la función `pedir` de `comidasApi.ts` revisa las dos:

```ts
async function pedir<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  let resp: Response;
  try {
    resp = await fetch(`${API_URL}${ruta}`, opciones);
  } catch {
    throw new Error('No se pudo conectar con el servidor');
  }

  const datos = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(datos.error || `Error del servidor (${resp.status})`);
  }
  return datos;
}
```

Las tres funciones del servicio usan `pedir`, así que el manejo de errores está escrito una sola vez. Las pantallas lo reciben con `try/catch`, lo guardan en el estado y lo muestran con el componente `MensajeError`, que incluye un botón "Reintentar".

| Caso | Qué ve el usuario |
|---|---|
| La API está apagada o no hay red | "No se pudo conectar con el servidor", con botón Reintentar |
| Se envía el formulario con un campo vacío | "La franja y la descripción son obligatorias" |
| Se abre el detalle de un id que no existe | "Comida no encontrada" |

Mientras llega la respuesta se muestra un `IonSpinner`, para que la pantalla nunca quede en blanco.

## Cómo ejecutarlo

API (en una terminal):
```
cd api
npm install
node server.js
```
Queda corriendo en `http://localhost:3000`.

App (en otra terminal, con la API encendida):
```
cd app
npm install
ionic serve
```
Se abre en `http://localhost:8100`.
