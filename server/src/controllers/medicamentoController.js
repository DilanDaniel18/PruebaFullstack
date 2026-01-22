import * as model from '../models/medicamentoModel.js';

export default class MedicamentoController {
  
  static async getMedicamentosOrderById(req, res) {
    try {
      const medicamentos = await model.getAllOrderById();
      res.json(medicamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static async getMedicamentosOrderByName(req, res) {
    try {
      const medicamentos = await model.getAllOrderByName();
      res.json(medicamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static async getMedicamentoById(req, res) {
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

  static async getMedicamentoByName(req, res) {
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

  static async createMedicamento(req, res) {
    try {
      const { nombre, categoria, cantidad, fecha_expiracion } = req.body;

      if (!nombre || cantidad === undefined) {
        return res.status(400).json({ message: 'Nombre y cantidad son obligatorios' });
      }
      if (cantidad < 0) {
        return res.status(400).json({ message: 'La cantidad no puede ser negativa' });
      }

      const nuevo = await model.create({ nombre, categoria, cantidad, fecha_expiracion });
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static async updateMedicamento(req, res) {
    try {
      const { id } = req.params;
      const { nombre, categoria, cantidad, fecha_expiracion } = req.body;

      if (cantidad !== undefined && cantidad < 0) {
        return res.status(400).json({ message: 'La cantidad no puede ser negativa' });
      }

      const actualizado = await model.update(id, { nombre, categoria, cantidad, fecha_expiracion });

      if (!actualizado) {
        return res.status(404).json({ message: 'ID no encontrado' });
      }

      res.json(actualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static async deleteMedicamento(req, res) {
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
}