import { useEffect, useMemo, useRef, useState } from 'react';

import { API_BASE_URL } from '@/api/apiConfig';
import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import { clickMovingScroll } from '@/utils/utils';
import style from './index.module.scss';
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
  const [isOpen, setIsOpen] = useState(false);
  const [evolutionUrl, setEvolutionUrl] = useState(null);
  const [evolutionResult, setEvolutionResult] = useState([]);
  const { speciesData, isLoading: speciesLoading, error: speciesError } = useGetSpecies(id);
  const { evolutionData, isLoading: evolutionLoading, error: evolutionError } = useGetEvolution(evolutionUrl);
  const sliderRef = useRef();

  useEffect(() => {
    clickMovingScroll(sliderRef.current);
  }, []);

  useEffect(() => {
    const newUrl = speciesData?.evolution_chain.url.split(`${API_BASE_URL}`)[1];
    setEvolutionUrl(newUrl);
  }, [speciesData, evolutionUrl]);

  const ids = useMemo(() => reProcessingFetchIds(evolutionResult), [evolutionResult]);
  const { imagesSrc, isLoading: imagesLoading, error: imagesError } = useLoadEvolutionImages(ids);

  if (speciesLoading) return <LoadingComponent />;
  if (speciesError) return <ErrorComponent />;

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
  const modalStyle = isOpen ? style.isShow : '';

  return (
    <div className={style.evolution}>
      <strong onClick={() => setIsOpen(prev => !prev)} className={style.evolution_btn}>
        진화
      </strong>
      <div className={`${style.evolution_modal} ${modalStyle}`}>
        <ul className={style.evolution_list} ref={sliderRef}>
          {imagesSrc.length === 0 ? (
            <span>정보 없음</span>
          ) : (
            imagesSrc.map((item, key) => (
              <li key={key} className={style.evolution_item}>
                <img src={item.src} />
                <span>{item.name}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
