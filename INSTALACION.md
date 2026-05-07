# Instalación — Presentación Física (GP2)

Guía para instalar **Node.js**, las dependencias del proyecto y comprobar que todo quedó listo en Windows, macOS o Linux.

## 1. Requisitos

- **Node.js** versión **18** o superior (recomendado: la versión LTS actual).
- **npm** (viene incluido con Node.js).

Comprobar en una terminal:

```bash
node -v
npm -v
```

Si no tenés Node.js: descargalo desde [https://nodejs.org](https://nodejs.org) (instalador LTS).

## 2. Clonar o copiar el proyecto

Si el repositorio está en Git (GitHub, GitLab, etc.):

```bash
git clone <URL_DEL_REPOSITORIO>
cd <carpeta-del-proyecto>
```

Si recibís el proyecto en un ZIP, descomprimilo y abrí la carpeta en la terminal.

## 3. Instalar dependencias

En la **raíz del proyecto** (donde está `package.json`):

```bash
npm install
```

Esto descarga React, Vite, Tailwind, Framer Motion y el resto de paquetes listados en `package.json` dentro de `node_modules/`.

### Windows y PowerShell

Si al ejecutar `npm` aparece un error de **política de ejecución**, podés usar:

```powershell
npm.cmd install
```

o abrir PowerShell como administrador y ajustar la política sólo si tu institución lo permite.

## 4. Verificar

Tras instalarse sin errores, seguí **`EJECUCION.md`** para levantar el servidor local.

## Problemas frecuentes

| Síntoma | Qué hacer |
|--------|-----------|
| `ENOENT` / no encuentra `package.json` | Asegurate de estar en la carpeta correcta (`ls` o `dir` debe mostrar `package.json`). |
| Puerto en uso | Cerrá otras apps que usen el mismo puerto o en `vite.config.js` configurá otro puerto si lo necesitás. |
| Versión muy vieja de Node | Actualizá a Node 18+ y volvé a ejecutar `npm install`. |
