# GoScript Interpreter - Web Application

Esta es una potente herramienta de interpretación para el lenguaje **GoScript**, que incluye un editor web moderno con soporte para archivos `.gst` y un diseño oscuro premium.

## Estructura del Proyecto

- `backend/`: Servidor Express que procesa el código utilizando el motor Jison.
- `frontend/`: Aplicación web moderna construida con React, Vite y Tailwind CSS.

## Comandos para arrancar el proyecto

Para iniciar el proyecto completo en modo desarrollo, sigue estos pasos:

1. **Instalar dependencias globales**:
   Asegúrate de estar en la carpeta raíz y ejecuta:
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Generar la gramática (Jison)**:
   Si realizas cambios en el archivo `.jison`, debes regenerar el parser:
   ```bash
   npm run jison
   ```

3. **Ejecutar el proyecto completo**:
   Ejecuta el siguiente comando en la raíz para arrancar tanto el Backend como el Frontend simultáneamente:
   ```bash
   npm start
   ```

## Acceso
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## Características del Frontend
- **Editor de código**: Edita directamente en el navegador.
- **Carga de archivos**: Abre tus archivos `.gst`.
- **Consola interactiva**: Visualiza los resultados de `fmt.println` en tiempo real.
- **Tabla de errores**: Identifica rápidamente problemas semánticos o sintácticos.
