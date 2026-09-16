# Semana 7 - Kotlin básico y componente Ionic

## Contenido

- `Producto.kt`: clase en Kotlin con validación y manejo de nulos.
- `Saludo.tsx`: componente en Ionic React que muestra un nombre y un botón.

## Diferencias entre Kotlin y TypeScript

**1. Null-safety**
En Kotlin, un tipo normal como `String` nunca puede ser `null`; para permitirlo hay que declararlo explícitamente como `String?`, y el compilador obliga a manejar ese caso (por ejemplo con `?.` o `?:`) antes de seguir usando la variable. En TypeScript también existe el `?` para marcar algo como opcional, pero es más flexible: si no se activa el modo estricto en la configuración del proyecto, es más fácil que un valor termine siendo `undefined` sin que el compilador lo detecte a tiempo.

**2. Dónde se ejecuta el código**
Kotlin se compila a bytecode de la JVM y corre de forma nativa en Android. TypeScript se compila a JavaScript y corre en el navegador o en Node.js, que es justo lo que usa Ionic para el desarrollo híbrido. Por eso Kotlin se usa para apps nativas de Android, y TypeScript para apps que deben funcionar igual en Android e iOS con un solo código.
