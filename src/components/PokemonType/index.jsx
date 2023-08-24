import { isBGLight } from '@/utils/utils';
import style from './index.module.scss';

const typeColors = {
  normal: '#A8A77A',
  fighting: '#C22E28',
  flying: '#A98FF3',
  poison: '#A33EA1',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  psychic: '#F95587',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
  unknown: '#68A090',
  shadow: '#4A3466',
};

export const PokemonType = ({ type, styles, children }) => {
  const typeKeys = Object.keys(typeColors);
  const results = typeKeys.filter(typekey => typekey === type);

  return (
    <>
      {results.map((typeKey, idx) => {
        const backgroundColor = typeColors[typeKey];
        const isLight = isBGLight(backgroundColor);
        const color = isLight ? '#000' : '#fff';

        return (
          <p key={typeKey} className={`${style.type} ${styles}`} style={{ backgroundColor, color }}>
            {children}
          </p>
        );
      })}
    </>
  );
};
