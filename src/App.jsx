import './App.css';

import { Route, Routes } from 'react-router-dom';

import { PokemonBook } from '@/components/PokemonBook';
import { PokemonDetail } from '@/components/PokemonDetail';
import { PokemonIndex } from '@/components/PokemonIndex';
import { RandomGacha } from '@/components/RandomGacha';
import { RandomPokemon } from '@/components/RandomPokemon';

function App() {
  return (
    <main className="main">
      <div className="inner">
        <Routes>
          <Route path="/" element={<PokemonIndex />} />
          <Route path="/random-gacha" element={<RandomGacha />} />
          <Route path="/random-pokemon/:id" element={<RandomPokemon />} />
          <Route path="/pokemon-detail/:id" element={<PokemonDetail />} />
          <Route path="/my-collection" element={<PokemonBook />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
