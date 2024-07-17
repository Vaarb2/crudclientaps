import React from 'react';
import { Container, Typography } from '@mui/material';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        CRUD de Clientes
      </Typography>
      <Home />
    </Container>
  );
};

export default App; 
