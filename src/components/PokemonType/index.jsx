import React from 'react';
import { isBGLight } from '@/utils/utils';
import { pokemonTypeTranslationAndColor } from '@/utils/constants';
import style from './index.module.scss';

export const PokemonType = React.memo(({ typeName, styles, children, as: Component = 'span' }) => {
  const mappingKeys = Object.keys(pokemonTypeTranslationAndColor);
  const matchedKey = mappingKeys.filter(mappingKey => mappingKey === typeName);

  const result = pokemonTypeTranslationAndColor && pokemonTypeTranslationAndColor[matchedKey];

  return (
    <>
      {matchedKey.map(typeKey => {
        const backgroundColor = pokemonTypeTranslationAndColor[typeKey].color;
        const isLight = isBGLight(backgroundColor);
        const color = isLight ? '#000' : '#fff';

        return (
          <Component key={typeKey} className={`${style.type} ${styles}`} style={{ backgroundColor, color }}>
            {children ? children : result.ko}
          </Component>
        );
      })}
    </>
  );
});
