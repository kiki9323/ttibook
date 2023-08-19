import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PokemonDetail } from '@/components/PokemonDetail';
import { QueryClientProvider } from 'react-query';
import { RandomGacha } from '@/components/RandomGacha';
import React from 'react';
import queryClient from '@/api/queryClient';

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<RandomGacha />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
