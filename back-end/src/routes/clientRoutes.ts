import express from 'express';
import { getClients, createClient, updateClient, deleteClient, getCompanyByCNPJ } from '../controllers/clientController';

const router = express.Router();
router.get('/company/:cnpj', getCompanyByCNPJ);
router.get('/', getClients);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
