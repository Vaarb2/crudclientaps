import axios from 'axios';
import { z } from 'zod';

export const clientSchema = z.object({
  cnpj: z.string().min(14).max(14),
  nome: z.string().max(100),
  nomeFantasia: z.string().max(100),
  cep: z.string().max(10),
  logradouro: z.string().max(100),
  bairro: z.string().max(100),
  cidade: z.string().max(100),
  uf: z.string().max(2),
  complemento: z.string().max(100).optional(),
  email: z.string().email().max(100),
  telefone: z.string().max(15)
});

export type Client = z.infer<typeof clientSchema>;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getClients = async () => {
  const response = await api.get('/clients');
  return response.data;
};

export const createClient = async (client: Client) => {
  await api.post('/clients', client);
};

export const updateClient = async (cnpj: string, client: Client) => {
  await api.put(`/clients/${cnpj}`, client);
};

export const deleteClient = async (cnpj: string) => {
  await api.delete(`/clients/${cnpj}`);
};

export const getAddressByCep = async (cep: string) => {
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  return response.data;
};

export const getCompanyByCNPJ = async (cnpj: string) => {
  try {
    const response = await api.get(`/clients/company/${cnpj}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching CNPJ data:', error);
    throw error;
  }
};
export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) return false;

  
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitos.charAt(0))) return false;

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitos.charAt(1))) return false;

  return true;
};
