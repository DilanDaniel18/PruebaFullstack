import express from 'express';
import cors from 'cors';
import medicamentoRoutes from './src/routes/medicamentoRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/medicamentos', medicamentoRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/api/medicamentos`);
});