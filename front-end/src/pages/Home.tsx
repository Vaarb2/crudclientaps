import React, { useState, useEffect } from 'react';
import { Box, Button, Modal } from '@mui/material';
import ClientList from '../components/ClientList';
import ClientForm from '../components/ClientForm';
import { Client } from '../services/api';

const Home: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [open, setOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingClient(null);
  };

  const fetchClients = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/clients`);
    const data = await response.json();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Adicionar Cliente
      </Button>
      <ClientList clients={clients} setEditingClient={setEditingClient} />
      <Modal open={open} onClose={handleClose}>
        <Box>
          <ClientForm
            onClose={handleClose}
            fetchClients={fetchClients}
            editingClient={editingClient}
            setClient={setEditingClient} 
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;

