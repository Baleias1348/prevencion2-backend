# Prevención 2 Backend

API Node.js/Express para autenticación y gestión de organizaciones usando Supabase.

## Variables de entorno

Crea un archivo `.env` basado en `.env.example` y completa con tus claves de Supabase (usa el Service Role Key para backend).

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
PORT=4000
```

## Scripts

- `npm install` — instala dependencias
- `npm run dev` — inicia en modo desarrollo (con nodemon)
- `npm start` — inicia en modo producción

## Despliegue

Sube este directorio a Render como servicio web Node.js. Configura las variables de entorno en el panel de Render.
