import './App.css';

import { Route, Routes } from 'react-router-dom';

import { PokemonBook } from '@/components/PokemonBook';
import { PokemonDetail } from '@/components/PokemonDetail';
import { PokemonLists } from './components/PokemonLists/index';
import { RandomGacha } from '@/components/RandomGacha';
import React from 'react';

function App() {
  return (
    <main className="main">
      <div className="inner">
        <Routes>
          <Route path="/" element={<PokemonLists />} />
          <Route path="/random-gacha" element={<RandomGacha />} />
          <Route path="/gacha-pokemon/:id" element={<PokemonDetail />} />
          <Route path="/my-collection" element={<PokemonBook />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
