# Prueba de usabilidad

Prueba de la app (historial, detalle y formulario de asistencia) con dos personas reales, identificadas como Persona 1 y Persona 2, sin datos personales.

## Cómo se hizo

- **Persona 1:** no pudimos vernos en persona. Yo compartí la pantalla y él me indicaba qué pulsar, y yo operaba la app. La sesión completa duró 13 minutos (de 9:07 a 9:20).
- **Persona 2:** usó la app con sus propias manos.
- Leí las tareas tal cual y no las expliqué. Les pedí que pensaran en voz alta.
- Al empezar, la app estaba recién cargada, con tres sesiones de ejemplo en el historial.

## Tareas

| # | Tarea |
| :-- | :-- |
| 1 | Encontrar cuánto duró una sesión de septiembre y qué músculos se trabajaron (Persona 1: la del 3 de septiembre; Persona 2: la del 1 de septiembre) |
| 2 | Registrar que el estudiante llegó al gimnasio y, después, que salió habiendo trabajado Pecho y Brazos |
| 3 | Corregir la selección de grupos musculares: marcar Espalda por error y dejar solo Piernas |

La tarea 1 usó fechas distintas para cada persona, así que no fue exactamente la misma tarea.

## Resultados

| Persona | Tarea | ¿Completó sin ayuda? | Tiempo | Errores observados | Lo que dijo |
| :-- | :-- | :-- | :-- | :-- | :-- |
| 1 | 1 | Sí | ~3 min | Empezó por las horas de entrada y salida | "Falta información" |
| 1 | 2 | Con una intervención mía: preguntó si se podían marcar los dos grupos y le respondí que sí | ~5 min | Duda sobre si se podía elegir más de un grupo | "¿Se puede poner de una de los dos?" |
| 1 | 3 | Sí | ~5 min | Quitó la selección con Cancelar y la alerta de descartar, y volvió a abrir el formulario | "Dale en cancelar" |
| 2 | 1 | Sí: dio la duración (60 min) y los músculos | 3 min | Empezó por las horas de entrada y salida | "Martes 1 de septiembre, entré a las 6, se fue a las 7" |
| 2 | 2 | Con ayuda mía: le dije que la hora se toma sola | 5 min | Buscó dónde poner el día y la hora | "¿Pero qué día?", "¿Es qué hora?" |
| 2 | 3 | No | 7 min | Buscó un botón de borrar o editar y no pudo quitar el músculo marcado | No lo registré |

Los tiempos de Persona 1 son aproximados: los tomé como la duración de cada tarea dentro de una sesión de 13 minutos.

## Los tres problemas más importantes

| # | Problema | Evidencia | Gravedad |
| :-- | :-- | :-- | :-- |
| A | No es evidente cómo quitar un grupo muscular marcado por error | Persona 2 buscó un botón de borrar o editar durante 7 minutos y no lo logró. Persona 1 recurrió a Cancelar, que descarta toda la selección | Alta: una tarea no se completó y las dos personas tuvieron dificultad |
| B | La pantalla no avisa que el día y la hora de la sesión se toman solos | Persona 2 buscó dónde escribir el día y la hora y necesitó ayuda mía | Media: afectó a una persona y requirió una intervención |
| C | El formulario no pide confirmar la salida mostrando lo marcado antes de guardarla | Persona 1 propuso mostrar una confirmación con los grupos elegidos antes de guardar | Media: es una sugerencia, no una dificultad observada |

También observé que, al buscar la duración, las dos personas empezaron por las horas de entrada y salida.

## Problema elegido para corregir

El problema A. Afectó a las dos personas y fue la tarea que una de ellas no pudo completar. La corrección se registra en el commit siguiente.

## Otras sugerencias de las personas

Estas ideas no son problemas de usabilidad que yo haya observado, sino sugerencias de producto, y quedan fuera de alcance:

- Vincular la sesión con un reloj que mida calorías.
- Agregar un temporizador y el registro de series y repeticiones.
- Persona 1 comentó que a la interfaz le faltaba estilo.

## Limitaciones de la prueba

- Solo dos personas, así que los resultados indican problemas posibles, no frecuencias.
- Persona 1 no usó la app directamente: yo la operé siguiendo sus indicaciones.
- Las fechas de la tarea 1 fueron distintas.
- De Persona 2 no registré lo que dijo en la tarea 3.