/* 
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createClient, updateClient, getAddressByCep, getCompanyByCNPJ, validateCNPJ } from '../services/api';


const initialClientState = {
  cnpj: '',
  nome: '',
  nomeFantasia: '',
  cep: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  uf: '',
  complemento: '',
  email: '',
  telefone: ''
};

const ClientForm = ({ client, setClient, fetchClients }: any) => {
  const [formData, setFormData] = useState(client || initialClientState);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData(client || initialClientState);
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCepBlur = async () => {
    if (formData.cep.length === 8) {
      try {
        const address = await getAddressByCep(formData.cep);
        setFormData({
          ...formData,
          logradouro: address.logradouro,
          bairro: address.bairro,
          cidade: address.localidade,
          uf: address.uf
        });
      } catch (error) {
        setError('Erro ao buscar endereço. Verifique o CEP.');
      }
    }
  };

  const handleCnpjBlur = async () => {
    const { cnpj } = formData;
    if (validateCNPJ(cnpj)) {
      try {
        const company = await getCompanyByCNPJ(cnpj);
        setFormData({
          ...formData,
          nome: company.nome,
          nomeFantasia: company.fantasia
        });
      } catch (error) {
        setError('Erro ao buscar dados da empresa. Verifique o CNPJ.');
      }
    } else {
      setError('CNPJ inválido');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (client && client.id) {
        await updateClient(client.id, formData);
      } else {
        await createClient(formData);
      }
      fetchClients();
      setClient(initialClientState);
    } catch (error) {
      setError('Erro ao salvar o cliente. Tente novamente.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="CNPJ" name="cnpj" value={formData.cnpj} onChange={handleChange} onBlur={handleCnpjBlur} />
      <TextField label="Nome" name="nome" value={formData.nome} onChange={handleChange} />
      <TextField label="Nome Fantasia" name="nomeFantasia" value={formData.nomeFantasia} onChange={handleChange} />
      <TextField label="CEP" name="cep" value={formData.cep} onChange={handleChange} onBlur={handleCepBlur} />
      <TextField label="Logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} />
      <TextField label="Bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
      <TextField label="Cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
      <TextField label="UF" name="uf" value={formData.uf} onChange={handleChange} />
      <TextField label="Complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} />
      <TextField label="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type="submit" variant="contained">Salvar</Button>
    </Box>
  );
};

export default ClientForm; */
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createClient, updateClient, getAddressByCep, getCompanyByCNPJ, validateCNPJ } from '../services/api';

const initialClientState: Client = {
  cnpj: '',
  nome: '',
  nomeFantasia: '',
  cep: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  uf: '',
  complemento: '',
  email: '',
  telefone: ''
};

interface Client {
  id?: string;
  cnpj: string;
  nome: string;
  nomeFantasia: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  complemento?: string;
  email: string;
  telefone: string;
}

interface ClientFormProps {
  setClient: React.Dispatch<React.SetStateAction<Client | null>>;
  fetchClients: () => void;
  onClose: () => void;
  editingClient: Client | null;
}

const ClientForm: React.FC<ClientFormProps> = ({ setClient, fetchClients, onClose, editingClient }) => {
  const [formData, setFormData] = useState<Client>(editingClient || initialClientState);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setFormData(editingClient || initialClientState);
  }, [editingClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCepBlur = async () => {
    if (formData.cep.length === 8) {
      try {
        const address = await getAddressByCep(formData.cep);
        setFormData({
          ...formData,
          logradouro: address.logradouro,
          bairro: address.bairro,
          cidade: address.localidade,
          uf: address.uf
        });
      } catch (error) {
        alert('Erro ao buscar endereço. Verifique o CEP.');
      }
    }
  };

  const handleCnpjBlur = async () => {
    const { cnpj } = formData;
    if (validateCNPJ(cnpj)) {
      try {
        const company = await getCompanyByCNPJ(cnpj);
        setFormData({
          ...formData,
          nome: company.nome,
          nomeFantasia: company.fantasia
        });
      } catch (error) {
        alert('Erro ao buscar dados da empresa. Verifique o CNPJ.');
      }
    } else {
      alert('CNPJ inválido');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editingClient && editingClient.id) {
        await updateClient(editingClient.id, formData);
      } else {
        await createClient(formData);
      }
      fetchClients();
      setClient(null);
      onClose();
    } catch (error) {
      alert('Erro ao salvar o cliente. Tente novamente.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="CNPJ" name="cnpj" value={formData.cnpj} onChange={handleChange} onBlur={handleCnpjBlur} />
      <TextField label="Nome" name="nome" value={formData.nome} onChange={handleChange} />
      <TextField label="Nome Fantasia" name="nomeFantasia" value={formData.nomeFantasia} onChange={handleChange} />
      <TextField label="CEP" name="cep" value={formData.cep} onChange={handleChange} onBlur={handleCepBlur} />
      <TextField label="Logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} />
      <TextField label="Bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
      <TextField label="Cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
      <TextField label="UF" name="uf" value={formData.uf} onChange={handleChange} />
      <TextField label="Complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} />
      <TextField label="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type="submit" variant="contained">Salvar</Button>
    </Box>
  );
};

export default ClientForm;
