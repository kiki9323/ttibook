import { DeleteButton } from './DeleteButton';
import { LikedButton } from './LikedButton';
import { PokemonType } from '@components/PokemonType';
import React from 'react';
import style from './index.module.scss';

export const DisplayedPokemonList = React.memo(({ displayedPokemon, handleModal, handleLiked, handleDelete }) => {
  return displayedPokemon.map(mon => (
    <li key={mon.id} className={style.my_pokemon_item} onClick={() => handleModal(mon, mon.id, mon.name)}>
      <img src={mon.url} alt={mon.name} />
      <PokemonType key={mon.id} typeName={mon.types[0].type.name} styles={style.my_pokemon_name}>
        {mon.name}
      </PokemonType>
      <LikedButton pokemon={mon} onLiked={handleLiked} />
      <DeleteButton targetId={mon.id} onRemove={handleDelete} />
    </li>
  ));
});

DisplayedPokemonList.displayName = 'DisplayedPokemonList';
