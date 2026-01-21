import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 100, 
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000, 
});

pool.on('connect', () => {
  console.log('Cliente conectado al Pool (Total: ' + pool.totalCount + ')');
});

pool.on('error', (err) => {
  console.error('Error inesperado en el cliente inactivo', err);
  process.exit(-1);
});

export default pool;