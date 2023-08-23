import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import style from './index.module.scss';

export const PokemonBook = () => {
  const navigate = useNavigate();
  const myPokemon = JSON.parse(localStorage.getItem('myMonster'));

  const handleModal = () => {
    console.log('click');
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>포켓몬 뽑으러가기</button>
      <h1>내 포켓몬 북</h1>
      <p>얘네.. 다 내꺼야..!</p>
      <ul className={style.myPokemon_list}>
        {Array.from(myPokemon).map(mon => {
          return (
            <li key={mon.id} className={style.myPokemon_item} onClick={handleModal}>
              <img src={mon.url} alt="" />
              <span className={style.myPokemon_name}>{mon.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
