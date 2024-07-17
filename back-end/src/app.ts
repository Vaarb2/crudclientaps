import express from 'express';
import dotenv from 'dotenv';
import clientRoutes from './routes/clientRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/clients', clientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
