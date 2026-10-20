# Accesibilidad y responsive (CP4)

## Lo corregido

- `app/index.html`: se quitó `user-scalable=no`, `minimum-scale` y `maximum-scale` del meta viewport, que bloqueaban el zoom. El título pasó a "Health Track".
- `HistoryList.tsx`: cada tarjeta de sesión tiene `aria-label` con fecha, horas, duración y músculos de esa sesión.
- Revisión de tokens, tamaños y áreas táctiles: los estilos en línea ya usaban `--ht-touch-min` y `--ht-text-muted`, todo está en `rem` o `%`, y ningún estado depende solo del color. No hizo falta cambiar más código.

## Lighthouse (Accessibility, Mobile)

| Medición | Puntaje | Condiciones |
|---|---|---|
| Antes | 86 | Chrome normal, con extensiones |
| Después | 100 | Ventana de incógnito, sin extensiones, Lighthouse 13.4.1 |

Nota honesta: el "antes" se midió con extensiones activas. Los botones sin nombre accesible venían de una extensión de Chrome, no de mi código. Por eso la comparación no es del todo equivalente. Lo que sí corregí fue el `user-scalable=no`.

![Lighthouse antes](img/before-lighthouse.png)
![Lighthouse después](img/after-lighthouse.png)

## Capturas responsive

Historial a 360 px:

![Historial 360](img/after-360.png)

Historial a 768 px:

![Historial 768](img/after-768.png)

Formulario a 360 px:

![Formulario 360](img/after-form-360.png)

Formulario a 768 px:

![Formulario 768](img/after-form-768.png)