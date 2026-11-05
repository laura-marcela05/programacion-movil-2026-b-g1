# Proyecto 1: Configuración del Entorno y Verificación Cangjie SDK

Este repositorio contiene la bitácora de instalación, pruebas de compilación y documentación técnica para la certificación de Huawei Cangjie Programming.

## Bitácora de Verificación del Entorno

* **Fecha de ejecución:** 4 de noviembre de 2026
* **Entorno principal de desarrollo:** Windows 11 + WSL2 (Ubuntu 24.04 LTS)
* **Versión del SDK de Cangjie:** 1.2.0

---

## Tareas Ejecutadas

### Task 1.1: Verificación de Compilación Nativa (Windows PowerShell)
- **Objetivo:** Verificar la capacidad de compilación directa mediante `cjc` en entorno Windows.
- **Resultado:**
  - Compilación exitosa usando `cjc main.cj -o main.exe`.
  - El ejecutable `main.exe` se generó y ejecutó de manera correcta mediante `.\main.exe`.
  - **Diagnóstico técnico:** `cjc` funciona correctamente para archivos individuales en Windows; sin embargo, para el gestor de paquetes y dependencias complejas (`cjpm`), el entorno oficial de desarrollo se migró a WSL2 debido a excepciones de memoria (`0xC0000005`) en el binario de `cjpm` nativo de Windows.

### Task 1.3: Evaluación de Entornos de Desarrollo (DevEco Studio vs. VS Code + WSL2)
- **Requisitos de Sistema (DevEco Studio):** Windows 11, mínimo 8 GB RAM (16 GB recomendado), 10 GB de espacio libre en disco.
- **Evaluación e Integración:**
  - DevEco Studio proporciona soporte para el ecosistema HarmonyOS y resaltado/autocompletado para Cangjie.
  - **Estrategia adoptada:** Se establece **VS Code + WSL2 (Ubuntu 24.04)** como el motor principal de compilación y ejecución (`cjpm` v1.2.0), reservando DevEco Studio principalmente para el diseño de interfaces y emulación en HarmonyOS NEXT.

### Task 1.4: Flujo de Trabajo con `cjpm` y Librería Estándar Extendida (`stdx`) en WSL2
- **Configuración del Entorno:**
  - Corrección de rutas de librerías dinámicas en `~/.bashrc` (`LD_LIBRARY_PATH`).
  - Creación de proyecto estructurado mediante `cjpm init` utilizando la convención de nomenclatura `camelCase` (`proyectoPrueba`).
- **Verificación de `stdx` (`std.collection`):**
  - Implementación de colecciones (`ArrayList`) y métodos de agregación (`add`) en `src/main.cj`.
  - Declaración explícita de paquete (`package proyectoPrueba`) en la cabecera del archivo fuente.
- **Resultado de ejecución en WSL2:**
  - `cjpm build`: Compilación exitosa (`cjpm build success`).
  - `cjpm run`: Salida obtenida:
    ```bash
    Prueba std exitosa: Cangjie - stdx test
    ```

---

## Estructura de Entregables (Proyecto 1)

```text
codigo/proyecto-1/
├── README.md
└── demo/
    ├── cjpm.toml
    └── src/
        └── main.cj