import express from 'express';
const router = express.Router();

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombres, apellidos, email, cargo, telefono, password } = req.body;
  if (!nombres || !apellidos || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }
  try {
    // Usar Admin API para crear usuario con metadatos
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        nombres,
        apellidos,
        cargo,
        telefono
      },
      email_confirm: true
    });
    if (error) throw error;
    res.status(201).json({ user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login de usuario (con email y password)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
  }
  try {
    // El login normal se hace en frontend, pero aquí puedes verificar credenciales si lo necesitas
    // O puedes retornar un error para forzar el login sólo por frontend
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    res.json({ session: data.session, user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Endpoint para iniciar OAuth con Google
router.get('/oauth/google', (req, res) => {
  // Permitir pruebas locales con ?local=1
  const isLocal = req.query.local === '1';
  const redirectTo = isLocal
    ? encodeURIComponent('http://localhost:5500/dashboard.html')
    : encodeURIComponent('https://prevencion2-frontend.netlify.app/dashboard.html');
  const supabaseUrl = process.env.SUPABASE_URL;
  const url = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectTo}`;
  res.redirect(url);
});

// Endpoint para manejar el callback (opcional, solo si quieres lógica extra)
// Si solo quieres que el usuario llegue directo al frontend, puedes omitir este endpoint y usar redirect_to

export default router;
