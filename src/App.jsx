import './App.css';

import { Route, Routes } from 'react-router-dom';

import { CaptureProvider } from '@/context/IsCapturedContext';
import { PokemonBook } from '@pages/PokemonBook';
import { PokemonDetail } from '@pages/PokemonDetail';
import { PokemonIndex } from '@pages/PokemonIndex';
import { RandomGacha } from '@pages/RandomGacha';
import { RandomPokemon } from '@pages/RandomPokemon';
import { RootLayout } from '@layout/RootLayout';

function App() {
  return (
    <CaptureProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<PokemonIndex />} />
          <Route path="/pokemon-detail/:id" element={<PokemonDetail />} />
          <Route path="/random-gacha" element={<RandomGacha />} />
          <Route path="/random-gacha/:id" element={<RandomPokemon />} />
          <Route path="/mybook" element={<PokemonBook />} />
        </Route>
      </Routes>
    </CaptureProvider>
  );
}

export default App;
