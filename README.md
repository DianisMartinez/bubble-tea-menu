# Bubble Tea & Coffee — Menú Digital

Proyecto de menú digital creado con React y Vite para una cafetería de Bubble Tea.

## Qué incluye

- Componente principal de menú con categorías y productos.
- Estilo moderno inspirado en bubble tea y diseño móvil-first.
- Integración de íconos sociales con FontAwesome.
- Configuración lista para despliegue en GitHub Pages.

## Cómo usarlo localmente

1. Instala dependencias:

```bash
npm install
```

2. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

3. Abre el navegador en la URL que indique Vite.

## Cómo compilar para producción

```bash
npm run build
```

El resultado se genera en `dist/`.

## Deploy en GitHub Pages

Esta aplicación está configurada para desplegarse en GitHub Pages con base `https://DianisMartinez.github.io/bubble-tea-menu/`.

### Usando GitHub Actions

El proyecto tiene una acción en `.github/workflows/deploy.yml` que construye y publica automáticamente cada vez que hagas push a `main`.

### Pasos para activar

1. Confirma que el repositorio remoto apunta a `https://github.com/DianisMartinez/bubble-tea-menu.git`.
2. Haz commit y push a `main`.
3. En GitHub, activa Pages desde la rama `gh-pages`.

## Notas

- Quité la dependencia `openai` porque no se estaba usando en este sitio.
- Si quieres agregar animaciones 3D con `three.js`, puedo ayudarte a integrarlo.
