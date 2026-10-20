# Navegación y tokens de diseño - Health Track

## Patrón de navegación: pila

Health Track tiene dos pantallas de asistencia por estudiante: AttendanceHistory y AttendanceForm. Las pestañas se recomiendan para 3 a 5 secciones principales, y aquí solo hay 2, que además dependen de un estudiante (`studentId`). Por eso uso pila: el entrenador entra al historial de un estudiante, desde ahí abre el formulario para registrar entrada o salida, y vuelve con el botón de regreso.

Rutas:
- `/students/:studentId/history` (AttendanceHistory)
- `/students/:studentId/attendance` (AttendanceForm)

## Tokens

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--ht-primary` | #1d4ed8 | Botón principal |
| `--ht-secondary` | #0f766e | Acciones secundarias |
| `--ht-success` | #15803d | Confirmaciones |
| `--ht-danger` | #b91c1c | Errores |
| `--ht-bg` | #f8fafc | Fondo de pantalla |
| `--ht-surface` | #ffffff | Tarjetas |
| `--ht-text` | #111827 | Texto principal |
| `--ht-text-muted` | #475569 | Texto secundario |
| `--ht-font-sm / md / lg` | 0.875 / 1 / 1.25 rem | Tamaños de letra (escalan con el sistema) |
| `--ht-space-1 a 4` | 0.25 / 0.5 / 1 / 1.5 rem | Espacios |
| `--ht-touch-min` | 2.75 rem (44 px) | Alto mínimo de elementos táctiles |

## Contraste (mínimo 4.5:1)

| Texto | Fondo | Relación | Cumple |
| :--- | :--- | :--- | :--- |
| Blanco | Primario | 6.7:1 | Sí |
| Blanco | Secundario | 5.47:1 | Sí |
| Blanco | Éxito | 5.02:1 | Sí |
| Blanco | Error | 6.47:1 | Sí |
| Texto | Fondo | 16.96:1 | Sí |
| Texto secundario | Fondo | 7.24:1 | Sí |
| Texto | Tarjeta | 17.74:1 | Sí |
| Primario | Fondo | 6.41:1 | Sí |
| Error | Fondo | 6.18:1 | Sí |