import * as model from '../models/medicamentoModel.js';

export const getMedicamentosOrderById = async (req, res) => {
  try {
    const medicamentos = await model.getAllOrderById();
    res.json(medicamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMedicamentosOrderByName = async (req, res) => {
  try {
    const medicamentos = await model.getAllOrderByName();
    res.json(medicamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMedicamentoById = async (req, res) => {
  try {
    const { id } = req.params;
    const medicamento = await model.searchById(id);
    
    if (!medicamento) {
      return res.status(404).json({ message: 'Medicamento no encontrado' });
    }
    
    res.json(medicamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMedicamentoByName = async (req, res) => {
  try {
    const { name } = req.params; 
    
    const medicamento = await model.searchByName(name);
    
    if (medicamento.length === 0) {
      return res.status(404).json({ message: 'Medicamento no encontrado' });
    }
    
    res.json(medicamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMedicamento = async (req, res) => {
  try {
    const { nombre, categoria, cantidad, fecha_expiracion } = req.body;
    
    if (!nombre || !cantidad) {
      return res.status(400).json({ message: 'Nombre y cantidad son obligatorios' });
    }

    const nuevo = await model.create({ nombre, categoria, cantidad, fecha_expiracion });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categoria, cantidad, fecha_expiracion } = req.body;

    const actualizado = await model.update(id, { nombre, categoria, cantidad, fecha_expiracion });

    if (!actualizado) {
      return res.status(404).json({ message: 'ID no encontrado' });
    }

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await model.remove(id);

    if (!eliminado) {
      return res.status(404).json({ message: 'ID no encontrado' });
    }

    res.json({ message: 'Medicamento eliminado correctamente', eliminado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};