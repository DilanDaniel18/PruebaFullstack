import { Router } from 'express';
import { 
  getMedicamentosOrderById, 
  getMedicamentosOrderByName,
  getMedicamentoById, 
  getMedicamentoByName,
  createMedicamento, 
  updateMedicamento, 
  deleteMedicamento 
} from '../controllers/medicamentoController.js';

const router = Router();

router.get('/', getMedicamentosOrderById);           
router.get('/orden/nombre', getMedicamentosOrderByName);
router.get('/buscar/:name', getMedicamentoByName);
router.get('/:id', getMedicamentoById);
router.put('/:id', updateMedicamento);
router.delete('/:id', deleteMedicamento);
router.post('/', createMedicamento);

export default router;