import { Router } from 'express';
import MedicamentoController from '../controllers/medicamentoController.js';

const router = Router();
router.get('/', MedicamentoController.getMedicamentosOrderById);
router.get('/orden/nombre', MedicamentoController.getMedicamentosOrderByName);
router.get('/buscar/:name', MedicamentoController.getMedicamentoByName);
router.get('/:id', MedicamentoController.getMedicamentoById);
router.put('/:id', MedicamentoController.updateMedicamento);
router.delete('/:id', MedicamentoController.deleteMedicamento);
router.post('/', MedicamentoController.createMedicamento);

export default router;