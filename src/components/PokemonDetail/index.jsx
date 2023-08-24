import { useNavigate, useParams } from 'react-router-dom';

import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import { SpritesImage } from './SpritesImage';
import style from './index.module.scss';
import useGetPokemon from '@/hooks/useGetPokemon';

export const PokemonDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const regex = /_default$/;

  const { data, isLoading, isError, error } = useGetPokemon(id);

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent />;

  const goHome = () => {
    navigate('/');
  };

  return (
    <div>
      <nav>
        <button onClick={goHome}>다시 뽑기</button>
      </nav>
      <h1>이름: {data.name}</h1>
      <ul className={style.sprite_list}>
        {Object.entries(data.sprites).map(([key, imgSrc], idx) => {
          if (!imgSrc) return null;
          if (!regex.test(key)) return null;
          return (
            <SpritesImage key={key + idx} spriteName={key} imgSrc={imgSrc} />
          );
        })}
      </ul>
    </div>
  );
};
