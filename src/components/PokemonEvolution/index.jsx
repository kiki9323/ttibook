import { useEffect, useState } from 'react';

import { API_BASE_URL } from '../../api/apiConfig';
import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import style from './index.module.scss';
import useGetEvolution from '../../hooks/useGetEvolution';
import useGetSpecies from '../../hooks/useGetSpecies';

export const PokemonEvolution = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [evolutionUrl, setEvolutionUrl] = useState(null);
  const { speciesData, isLoading: speciesLoading, error: speciesError } = useGetSpecies(id);
  const { evolutionData, isLoading: evolutionLoading, error: evolutionError } = useGetEvolution(evolutionUrl);

  useEffect(() => {
    const newUrl = speciesData?.evolution_chain.url.split(`${API_BASE_URL}`)[1];
    setEvolutionUrl(newUrl);
  }, [speciesData, evolutionUrl]);

  if (speciesLoading) return <LoadingComponent />;
  if (speciesError) return <ErrorComponent />;

  const modalStyle = isOpen ? style.isShow : '';

  const evolutionResult = [];
  function extractData(obj) {
    if (obj.species) {
      evolutionResult.push({
        name: obj.species.name,
        url: obj.species.url,
      });
    }
    if (obj.evolves_to && obj.evolves_to.length > 0) {
      obj.evolves_to.forEach(item => {
        extractData(item);
      });
    }
  }

  if (evolutionData) {
    extractData(evolutionData.chain); //evolutionData.chain 안에서만 검색

    // evolutionResult.map(i => {
    //   const str = i.url.split('pokemon-species')[1];
    //   str = str.slice(1, str.length - 1);
    //   console.log(str);
    // });
  }

  return (
    <div className={style.evolution}>
      <strong onClick={() => setIsOpen(prev => !prev)} className={style.evolution_btn}>
        진화
      </strong>
      <div className={`${style.evolution_modal} ${modalStyle}`}>
        <ul>
          {evolutionResult.map((item, key) => (
            <li key={key}>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
