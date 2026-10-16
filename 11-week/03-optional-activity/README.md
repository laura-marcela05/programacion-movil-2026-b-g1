# Semana 11 · NutriTrack: rediseño UX de la pantalla de comidas

**Asignatura:** Programación Móvil  
**Nombre:** Laura Marcela Quintero  
**Usuario de GitHub:** laura-marcela05

## Descripción

Se rediseñó la pantalla de comidas de NutriTrack, la que quedó funcionando en la semana 10, aplicando los principios de UX/UI móvil de la sesión: una sola tarea por pantalla con jerarquía visual clara, un patrón de navegación (tabs más stack), los estados cargando, con datos, vacío y error, y una revisión de accesibilidad (contraste, tamaño del texto y áreas táctiles).

La API de la semana 10 no cambió: todo el trabajo está en la app.

## La pantalla antes del rediseño

Así quedó en la semana 10:

| Con datos | Con la API apagada |
|---|---|
| ![Antes: lista](evidencias-ux/antes-lista.png) | ![Antes: error](evidencias-ux/antes-error.png) |

Funcionaba, pero tenía estos problemas:

| Problema | Por qué afecta al usuario |
|---|---|
| El formulario y la lista estaban en la misma pantalla | Dos tareas compiten y ninguna destaca; lo más importante (ver lo que comió) quedaba debajo del formulario |
| Un contador "registradas en esta sesión" entre el formulario y la lista | Información de poco valor que distrae de la tarea principal |
| Si la carga fallaba, se mostraba el error y a la vez "Aún no hay comidas" | El usuario recibía dos mensajes contradictorios |
| Si fallaba guardar una comida, "Reintentar" volvía a pedir la lista | El botón no hacía lo que el usuario esperaba |
| La franja (Desayuno, Almuerzo, Cena) era un texto pequeño y gris | Difícil de leer con baja visión y sin jerarquía |
| Los campos del formulario solo tenían placeholder | Un lector de pantalla no sabe qué es cada campo |
| El botón "Reintentar" era `size="small"` | Cuesta tocarlo con poca precisión |
| El estado de carga no se anunciaba al lector de pantalla | Quien lo usa no sabe que la app está cargando |
| En pantallas anchas todo se estiraba de lado a lado | Las filas quedan larguísimas y cuesta leerlas |

## La pantalla después del rediseño

### 1. Jerarquía: una tarea por pantalla

Cada pantalla ahora tiene un solo objetivo: **Comidas** para ver lo registrado, **Registrar** para agregar una comida y **Resumen** para ver el total por franja. El formulario salió de la lista y el contador de la sesión se eliminó.

Dentro de cada fila también hay jerarquía: primero el nombre de la comida (1.2rem, en negrita), debajo la fecha y a la derecha la franja como etiqueta de color.

![Después: lista con etiquetas](evidencias-ux/despues-lista-badges.png)

### 2. Navegación: tabs + stack

Se usan **tabs** para las 3 secciones principales y **stack** para el detalle (lista → detalle, con el botón "Volver"). Las rutas y las pestañas están en `App.tsx`:

```tsx
<IonTabs>
  <IonRouterOutlet>
    <Route path="/comidas" element={<Home />} />
    <Route path="/registrar" element={<Registrar />} />
    <Route path="/resumen" element={<Resumen />} />
    <Route path="/detalle/:id" element={<Detalle />} />
    <Route path="/" element={<Navigate to="/comidas" replace />} />
  </IonRouterOutlet>
  <IonTabBar slot="bottom"> ... </IonTabBar>
</IonTabs>
```

Al guardar una comida, `Registrar.tsx` muestra un mensaje de éxito y lleva al usuario a la pestaña Comidas para que vea el resultado:

```tsx
mostrarToast({ message: `Se registró «${nueva.descripcion}» en ${nueva.franja}`, color: 'success' });
router.push('/comidas', 'root');
```

![Después: mensaje al guardar](evidencias-ux/despues-guardado-toast.png)

La tercera pestaña, **Resumen**, muestra el total de comidas y cuántas hay por franja:

![Después: pestaña Resumen](evidencias-ux/despues-tab-resumen.png)

Con tabs, Ionic deja montadas las pestañas ya visitadas, así que un `useEffect` no volvería a cargar la lista. Por eso el hook `useComidas` usa `useIonViewWillEnter`, que se ejecuta cada vez que la pantalla se va a mostrar.

### 3. Estados de la interfaz

Cada pantalla que carga datos muestra siempre exactamente uno de estos estados:

```tsx
function contenido() {
  if (cargando) return <EstadoCarga mensaje="Cargando tus comidas..." />;
  if (error) return <MensajeError mensaje={error} onReintentar={cargar} />;
  if (comidas.length === 0) return <EstadoVacio titulo="Aún no has registrado comidas" ... />;
  return <ListaComidas comidas={comidas} />;
}
```

| Estado | Qué ve el usuario | Componente |
|---|---|---|
| Cargando | Spinner con el texto "Cargando tus comidas..." | `EstadoCarga.tsx` |
| Con datos | La lista con nombre, fecha y franja | `ListaComidas.tsx` |
| Vacío | Un ícono, "Aún no has registrado comidas" y qué hacer | `EstadoVacio.tsx` |
| Error | El mensaje y el botón Reintentar | `MensajeError.tsx` |

El orden de los `if` importa: el vacío solo se muestra cuando la petición salió bien y llegó una lista sin elementos, así no se confunde "no hay comidas" con "no se pudo conectar". Además, el error al cargar y el error al guardar ahora son independientes.

![Después: error con botón Reintentar](evidencias-ux/despues-error.png)

### 4. Accesibilidad

**Contraste.** La franja pasó de texto gris pequeño a una etiqueta (`IonBadge`) con color y con la palabra escrita, así que la información no depende solo del color. Los valores se midieron sobre la app en funcionamiento (modo claro) y superan el mínimo de 4.5 : 1 que pide WCAG para texto:

| Elemento | Colores | Contraste |
|---|---|---|
| Etiqueta "Desayuno" | texto negro sobre amarillo | 13.2 : 1 |
| Etiqueta "Almuerzo" | texto negro sobre verde | 10.8 : 1 |
| Etiqueta "Cena" | texto blanco sobre morado | 6.2 : 1 |
| Fecha de cada comida | gris sobre blanco | 5.7 : 1 |

**Áreas táctiles.** Todo lo que se puede tocar mide más de 44px de alto:

| Elemento | Antes | Después |
|---|---|---|
| Fila de la lista | alto por defecto | 69px |
| Botón "Registrar comida" | botón normal | `size="large"`, 56px |
| Campos del formulario | alto por defecto | 56px |
| Pestañas de navegación | por defecto | 56px |
| Botón "Reintentar" | `size="small"` | tamaño normal, `min-height: 3rem` (48px) |

**Textos legibles.** El nombre de la comida pasó de 14px a 1.2rem (19.2px) y la fecha de 14px a 1rem (16px). Se usa `rem` para que el texto crezca si el usuario aumenta el tamaño de letra en su teléfono.

**Campos con etiqueta.** El formulario tiene los labels visibles "Franja del día" y "¿Qué comiste?", en lugar de depender solo del placeholder.

![Después: formulario con labels](evidencias-ux/despues-formulario-labels.png)

**Lector de pantalla.**
- El estado de carga tiene `role="status"` y el de error `role="alert"`, así se anuncian apenas aparecen.
- Los íconos decorativos (spinner, ícono del estado vacío, íconos de las pestañas) llevan `aria-hidden="true"`.
- El spinner del botón al guardar tiene `aria-label="Guardando"`.

**Diseño responsivo.** El contenido de todas las pantallas vive dentro de `.contenedor`, una columna que en el teléfono ocupa todo el ancho y en tablet o computador se queda centrada con un máximo de 40rem (640px):

```css
.contenedor {
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
}
```

| Celular (440 px de ancho) | Tablet (1032 px de ancho) |
|---|---|
| ![Después: celular](evidencias-ux/despues-celular.png) | ![Después: tablet](evidencias-ux/despues-tablet.png) |

## Resumen: antes y después

| | Antes (semana 10) | Después (semana 11) |
|---|---|---|
| Jerarquía | Formulario, contador y lista en una sola pantalla | Una tarea por pantalla; el nombre de cada comida destaca |
| Navegación | Stack: lista → detalle | Tabs (Comidas, Registrar, Resumen) + stack para el detalle |
| Estados | Cargando y error; el vacío era un texto gris y salía junto al error | Cargando, datos, vacío y error, siempre uno solo a la vez |
| Errores | Uno solo para cargar y guardar | Independientes: cargar y guardar |
| Feedback al guardar | La comida aparecía al final de la lista | Mensaje "Se registró…" y paso a la lista |
| Franja de la comida | Texto gris pequeño | Etiqueta de color con la palabra escrita |
| Formulario | Solo placeholder | Labels visibles |
| Áreas táctiles | "Reintentar" pequeño | Todo lo tocable mide 48px o más |
| Lector de pantalla | Sin `role` en la carga | `role="status"` y `role="alert"`, íconos ocultos |
| Pantallas anchas | Todo estirado de lado a lado | Columna centrada de máximo 40rem |

## Estructura

```
11-week/03-optional-activity/
├── api/                                   -> backend Node.js + Express (igual que la semana 10)
│   ├── server.js
│   ├── routes/comidas.js
│   └── data/comidas.js
├── app/                                   -> app Ionic React
│   └── src/
│       ├── App.tsx                        -> tabs y rutas
│       ├── theme/
│       │   └── layout.css                 -> columna centrada (.contenedor)
│       ├── hooks/
│       │   └── useComidas.ts              -> carga la lista y sus estados
│       ├── services/
│       │   └── comidasApi.ts              -> llamadas fetch a la API
│       ├── components/
│       │   ├── EstadoCarga.tsx            -> estado "cargando"
│       │   ├── EstadoVacio.tsx            -> estado "vacío"
│       │   ├── MensajeError.tsx           -> estado "error" con Reintentar
│       │   ├── estados.css                -> estilos compartidos de los estados
│       │   ├── FranjaBadge.tsx            -> etiqueta de color de la franja
│       │   ├── ListaComidas.tsx
│       │   ├── FormularioComida.tsx
│       │   └── comidas.css
│       └── pages/
│           ├── Home.tsx                   -> pestaña Comidas
│           ├── Registrar.tsx              -> pestaña Registrar
│           ├── Resumen.tsx / .css         -> pestaña Resumen
│           └── Detalle.tsx                -> detalle de una comida
└── evidencias-ux/                         -> capturas del antes y el después
```

Archivos nuevos: `hooks/useComidas.ts`, `Registrar.tsx`, `Resumen.tsx`, `EstadoCarga.tsx`, `EstadoVacio.tsx`, `FranjaBadge.tsx`, `estados.css`, `comidas.css` y `layout.css`. El resto se ajustó a partir de la semana 10.

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

Para ver cada estado:
- **Cargando:** en las herramientas del navegador (F12 → Network), cambia la velocidad a Slow 3G y recarga.
- **Vacío:** deja el arreglo de `api/data/comidas.js` vacío (`[]`) y reinicia la API.
- **Error:** apaga la API (Ctrl + C) y recarga la app.
