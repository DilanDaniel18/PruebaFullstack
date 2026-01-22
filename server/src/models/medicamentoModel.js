import pool from '../config/db.js';

// Queries para el manejo de los datos de Medicamentos

// Obtener todos los medicamentos ordenados por ID
export const getAllOrderById = async () => {
  const result = await pool.query('SELECT * FROM medicamentos ORDER BY id ASC');
  return result.rows;
};

// Obtener todos los medicamentos ordenados por Nombre
export const getAllOrderByName = async () => {
  const result = await pool.query('SELECT * FROM medicamentos ORDER BY nombre ASC');
  return result.rows;
};

// Buscar medicamento por ID
export const searchById = async (id) => {
  const result = await pool.query('SELECT * FROM medicamentos WHERE id = $1', [id]);
  return result.rows[0];
};

// Buscar medicamento por Nombre (búsqueda parcial)
export const searchByName = async (termino) => {
  const query = 'SELECT * FROM medicamentos WHERE nombre ILIKE $1 ORDER BY nombre ASC';
  const values = [`${termino}%`]; 
  
  const result = await pool.query(query, values);
  return result.rows;
};

// Crear un nuevo medicamento
export const create = async ({ nombre, categoria, cantidad, fecha_expiracion }) => {
  const query = `
    INSERT INTO medicamentos (nombre, categoria, cantidad, fecha_expiracion)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [nombre, categoria, cantidad, fecha_expiracion];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Actualizar un medicamento existente
export const update = async (id, { nombre, categoria, cantidad, fecha_expiracion }) => {
  const query = `
    UPDATE medicamentos
    SET nombre = $1, categoria = $2, cantidad = $3, fecha_expiracion = $4
    WHERE id = $5
    RETURNING *;
  `;
  const values = [nombre, categoria, cantidad, fecha_expiracion, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Eliminar un medicamento mediante su ID
export const remove = async (id) => {
  const query = 'DELETE FROM medicamentos WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};