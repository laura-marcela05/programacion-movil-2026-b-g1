<!-- CONFIG-START -->

FULL_NAME: (tu nombre completo)
GITHUB USER: laura-marcela05
TEAM: Health Track
DOCS_REPO: https://github.com/code-corhuila/healt-track-docs
CODE_REPO: https://github.com/code-corhuila/h-tracker
BASELINE: starter programacion-movil-2026-b-starter-react, commit (el hash del paso 1)
REFLECTION_DOC: (URL de tu Google Doc)

- MY_SCREENS: AttendanceHistory y AttendanceForm
<!-- CONFIG-END -->

## Línea base

La app de mi equipo es Health Track, está hecha en React Native con Expo, en el análisis de esta me topé con un problema: no se puede abrir en el navegador, así que no puedo revisarla con Lighthouse ni probarla a 360 px y 768 px de ancho como pide la actividad. Para no quedarme sin una base medible, decidí usar como línea base el starter Ionic React que vimos en el curso, que sí corre en el navegador y me deja hacer todas las pruebas necesarias.

Sobre esa base rediseño dos pantallas de Health Track que ya están documentadas en el repositorio `healt-track-docs` (carpeta `01-architecture/screens`): `AttendanceHistory` (el historial de asistencia) y `AttendanceForm` (el formulario para registrar la asistencia). Las escogí porque una es de consulta y la otra es de captura de datos, así que me permiten practicar los estados de carga, datos y error, y revisar cómo se comporta la navegación entre ambas.
