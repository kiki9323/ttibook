import { useCallback, useEffect, useState } from 'react';

import { fetchPokemonById } from '@/api/pokemonApi';

const useLoadEvolutionImages = ids => {
  const [imagesSrc, setImagesSrc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvolutionImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await Promise.all(
        ids
          .map(async i => {
            try {
              const response = await fetchPokemonById(i);
              const { sprites, name } = response;
              return { src: sprites.front_default, name };
            } catch (error) {
              console.error(`Failed to fetch Pokemon by id ${i}:`, error);
              return null;
            }
          })
          .reverse(),
      );

      setImagesSrc(data.filter(item => item !== null));
    } catch (error) {
      console.error('Failed to fetch evolution images:', error);
      setError(error);
    }
    setIsLoading(false);
  }, [ids]);

  useEffect(() => {
    fetchEvolutionImages();
  }, [fetchEvolutionImages]);

  return { imagesSrc, isLoading, error };
};

export default useLoadEvolutionImages;
