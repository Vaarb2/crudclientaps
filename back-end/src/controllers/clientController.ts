import axios from 'axios';
import { Request, Response } from 'express';
import pool from '../config/db';
import { z } from 'zod';

const clientSchema = z.object({
  cnpj: z.string().length(14),
  nome: z.string().max(100),
  nomeFantasia: z.string().max(100),
  cep: z.string().max(10),
  logradouro: z.string().max(100),
  bairro: z.string().max(100),
  cidade: z.string().max(100),
  uf: z.string().length(2),
  complemento: z.string().max(100).optional(),
  email: z.string().email(),
  telefone: z.string().max(15),
});

export const getClients = async (req: Request, res: Response) => {
  const [rows] = await pool.query('SELECT * FROM clients');
  res.json(rows);
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const data = clientSchema.parse(req.body);
    const [result] = await pool.query('INSERT INTO clients SET ?', [data]);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const data = clientSchema.parse(req.body);
    const { id } = req.params;
    const [result] = await pool.query('UPDATE clients SET ? WHERE id = ?', [data, id]);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [result] = await pool.query('DELETE FROM clients WHERE id = ?', [id]);
  res.json(result);
};

export const getCompanyByCNPJ = async (req: Request, res: Response) => {
  const { cnpj } = req.params;
  const url = `https://receitaws.com.br/v1/cnpj/${cnpj}`;

  console.log(`Fetching data from: ${url}`);

  try {
    const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
        },
    });
    console.log('API response:', response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados da empresa.' });
  }
};