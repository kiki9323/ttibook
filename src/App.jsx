import './App.css';

import { Route, Routes } from 'react-router-dom';

// import { MainComponent } from '@/components/MainComponent';
// import { MainTest } from '@/components/MainTest';
import { PokemonBook } from '@/components/PokemonBook';
import { PokemonDetail } from '@/components/PokemonDetail';
import { RandomGacha } from '@/components/RandomGacha';
import React from 'react';

function App() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<RandomGacha />} />
        <Route path="/gacha-pokemon/:id" element={<PokemonDetail />} />
        <Route path="/myCollection" element={<PokemonBook />} />
      </Routes>
    </main>
  );
}

export default App;
