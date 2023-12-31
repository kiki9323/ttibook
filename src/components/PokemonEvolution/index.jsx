import { useEffect, useMemo, useRef, useState } from 'react';

import { API_BASE_URL } from '@/api/axiosConfig';
import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import style from './index.module.scss';
import { useClickMovingScroll } from '@/hooks/useClickMovingScroll';
import useGetEvolution from '@/hooks/useGetEvolution';
import useGetSpecies from '@/hooks/useGetSpecies';
import useLoadEvolutionImages from '@/hooks/useLoadEvolutionImages';

const reProcessingFetchIds = evolutionResult => {
  const getIdFromURL = url => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  };

  const ids = evolutionResult.map(i => getIdFromURL(i.url));
  return ids;
};

export const PokemonEvolution = ({ id }) => {
  const [evolutionUrl, setEvolutionUrl] = useState(null);
  const [evolutionResult, setEvolutionResult] = useState([]);
  const { speciesData, isLoading: speciesIsLoading, isError: speciesIsError, error: speciesError } = useGetSpecies(id);
  const { evolutionData } = useGetEvolution(evolutionUrl);

  const sliderRef = useRef();
  useClickMovingScroll(sliderRef.current);

  useEffect(() => {
    const newUrl = speciesData?.evolution_chain.url.split(`${API_BASE_URL}`)[1];
    setEvolutionUrl(newUrl);
  }, [speciesData, evolutionUrl]);

  const ids = useMemo(() => reProcessingFetchIds(evolutionResult), [evolutionResult]);
  const {
    imagesSrc,
    isLoading: imagesLoading,
    isError: imagesIsError,
    error: imagesError,
  } = useLoadEvolutionImages(ids);

  if (speciesIsLoading) return <LoadingComponent loadingMessage={`상세 페이지 로딩 중`} />;
  if (speciesIsError) return <ErrorComponent errorMessage={speciesError.message} />;

  const extractData = obj => {
    if (!obj) return;
    if (obj?.species) {
      const newEvolutionResult = [...evolutionResult];
      if (!newEvolutionResult.find(e => e.name === obj.species.name)) {
        setEvolutionResult([...evolutionResult, { name: obj.species.name, url: obj.species.url }]);
      }
    }

    if (obj.evolves_to && obj.evolves_to.length > 0) {
      obj.evolves_to.forEach(item => {
        extractData(item);
      });
    }
  };

  extractData(evolutionData?.chain); //evolutionData.chain 안에서만 검색

  return (
    <ul className={style.evolution_list} ref={sliderRef}>
      {imagesLoading && <LoadingComponent text={'진화 사슬 불러오는 중'} />}
      {imagesIsError && <ErrorComponent error={imagesError} />}
      {imagesSrc &&
        imagesSrc.map((item, key) => (
          <li key={key} className={style.evolution_item}>
            <img src={item.src} alt={item.name} />
            <span>{item.name}</span>
          </li>
        ))}
    </ul>
  );
};
