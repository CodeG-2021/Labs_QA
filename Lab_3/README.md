# Lab 3 - Automatización con Cypress

Este proyecto de Angular sirve como base para automatizar con Cypress el formulario de búsqueda de alojamiento de [Booking.com](https://www.booking.com/).

## Casos de prueba diseñados

Se definieron cuatro casos de prueba de caja negra empleando diferentes técnicas:

1. **Búsqueda exitosa con datos válidos (Clases de equivalencia)**: verifica una búsqueda estándar con destino y fechas futuras.
2. **Validación de destino obligatorio (Clases de equivalencia inválida)**: confirma que se muestra el mensaje de error cuando el destino está vacío.
3. **Restricción de fechas pasadas (Valores límite)**: asegura que el calendario impide seleccionar fechas anteriores al día actual.
4. **Configuración de ocupación (Combinación por pares)**: valida que la URL resultante conserva la ocupación seleccionada (2 adultos, 1 menor de 10 años).

Cada prueba está documentada en `cypress/e2e/booking-search.spec.ts` con comentarios que describen nombre, objetivo, datos de entrada y resultado esperado.

## Requisitos previos

Es necesario contar con Node.js 18 o superior. Debido a las restricciones del entorno actual no fue posible descargar las dependencias desde npm, por lo que al instalar en otro entorno se recomienda ejecutar:

```bash
npm install
```

## Comandos útiles

```bash
npm run cypress:open   # Abre el Test Runner interactivo
npm run cypress:run    # Ejecuta las pruebas en modo headless
```

El archivo de configuración (`cypress.config.ts`) incluye el patrón `cypress/e2e/**/*.spec.ts`, por lo que los archivos de prueba con esa terminación aparecerán automáticamente en el runner una vez instaladas las dependencias.

> **Nota:** Las pruebas apuntan al entorno real de Booking.com y pueden requerir una conexión estable a Internet.
