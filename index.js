import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Usar SERVICE_ROLE_KEY para backend seguro
);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Prevención 2 Backend API' });
});

import authRoutes from './routes/auth.js';
import orgRoutes from './routes/organizations.js';

app.use('/api/auth', authRoutes);
app.use('/api/organizations', orgRoutes);

app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
