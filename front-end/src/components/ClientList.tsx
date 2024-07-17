import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Client } from '../services/api';

interface ClientListProps {
  clients: Client[];
  setEditingClient: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, setEditingClient }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>CNPJ</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Nome Fantasia</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(client => (
            <TableRow key={client.cnpj}>
              <TableCell>{client.cnpj}</TableCell>
              <TableCell>{client.nome}</TableCell>
              <TableCell>{client.nomeFantasia}</TableCell>
              <TableCell>
                <Button onClick={() => setEditingClient(client)}>Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientList;
