# Cómo ejecutar la presentación

Asumimos que ya corriste `npm install` (ver **`INSTALACION.md`**).

## Modo desarrollo (recomendado para exponer con laptop)

Desde la raíz del proyecto:

```bash
npm run dev
```

Vite mostrará en la terminal una URL local, habitualmente:

- **http://localhost:5173**

Abrila en el navegador (Chrome o Edge funcionan bien a pantalla completa).

### Atajos durante la expo

- **Siguiente:** flecha derecha, **Enter** o **barra espaciadora**.
- **Anterior:** flecha izquierda o **Retroceso** (Backspace).

Hacé clic una vez dentro de la página si el foco del teclado no responde.

## Compilar para producción (archivos estáticos)

```bash
npm run build
```

La salida queda en la carpeta `dist/`.

## Previsualizar el build localmente

```bash
npm run preview
```

Útil para probar exactamente lo que se desplegaría en un servidor estático.

## Presentar en aula / proyector

1. Ejecutá `npm run dev` o serví la carpeta `dist/` con cualquier servidor estático.
2. Navegador en **pantalla completa** (F11 en muchos sistemas).
