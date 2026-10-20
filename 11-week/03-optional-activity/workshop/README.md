# Taller semana 11: UX/UI en pantallas avanzadas (Health Track)

Taller individual de Programación Móvil 2026-B, Corte 3. Aplico los temas de la semana 11 (jerarquía visual, patrón de navegación, tokens de diseño, estados de pantalla, retroalimentación, accesibilidad y diseño responsivo) a dos pantallas de la app de mi equipo, Health Track.

<!-- CONFIG-START -->

FULL_NAME: Laura Marcela Quintero Poveda
GITHUB USER: laura-marcela05
TEAM: Health Track
DOCS_REPO: https://github.com/code-corhuila/healt-track-docs
CODE_REPO: https://github.com/code-corhuila/h-tracker
BASELINE: starter programacion-movil-2026-b-starter-react, commit <hash>
REFLECTION_DOC: https://docs.google.com/document/d/1lrPC0ee1Zxwj8J0sJheTHCunN1wGNFyLt9Gg7lCOf2A/edit?usp=sharing

- MY_SCREENS: AttendanceHistory (lista), AttendanceForm (formulario)
<!-- CONFIG-END -->

## Línea base

La app de mi equipo (Health Track) está hecha en React Native con Expo y se puede abrir en el navegador con Expo web, pero hoy solo tiene construidas Login y la lista de estudiantes con su modal. Las dos pantallas que me tocan, `AttendanceHistory` (el historial de asistencia) y `AttendanceForm` (el formulario para registrar la asistencia), solo están especificadas en el repositorio `healt-track-docs` (carpeta `01-architecture/screens`) y no existen en el código del equipo.

Como no tengo una versión actual de esas pantallas para rediseñar, las construyo sobre el starter Ionic React del curso, que corre en el navegador y me deja medirlas con Lighthouse y probarlas a 360 px y 768 px. Escogí estas dos porque una es de consulta y la otra es de captura de datos, así que me permiten practicar los estados de carga, datos y error, y revisar cómo funciona la navegación entre ambas.

## Cómo correr

Desde `11-week/03-optional-activity/workshop/app`:

1. `npm install`
2. `npm run dev` y abrir la app en el navegador (la ruta inicial lleva al historial de `demo-student`).
3. `npm test` para correr la prueba del estado de error.

Para ver cada estado de la lista agrego un parámetro a la URL: `?sim=slow` (carga lenta), `?sim=error` (falla) o `?sim=empty` (sin sesiones).

## Entregables

| Checkpoint               | Archivo                    |
| :----------------------- | :------------------------- |
| CP1: auditoría UX        | `docs/01-ux-audit.md`      |
| CP2: navegación y tokens | `docs/02-design-tokens.md` |
