import { useEffect, useState, useTransition } from 'react';

import { LikedButton } from '../LikedButton';
import { Modal } from '../Modal';
import { PokemonType } from '@components/PokemonType';
import style from './index.module.scss';
import { useNavigate } from 'react-router-dom';

export const PokemonBook = () => {
  const navigate = useNavigate();

  const initialData = JSON.parse(localStorage.getItem('myMonster')) || [];
  const [myPokemon, setMyPokemon] = useState(initialData);
  const [displayedPokemon, setDisplayedPokemon] = useState(initialData);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSearch = e => {
    const searchQuery = e.target.value;
    const filteredData = myPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()));

    setSearchQuery(searchQuery);

    if (!searchQuery || searchQuery.length === 0) {
      setDisplayedPokemon(initialData);
    } else {
      startTransition(() => {
        setDisplayedPokemon(filteredData);
      });
    }
  };

  const handleClearQuery = e => {
    e.preventDefault();
    setSearchQuery('');
    setDisplayedPokemon(initialData);
  };

  const handleModal = mon => {
    console.log(mon);
    setIsModalOpen(displayedPokemon.find(p => p.id === mon.id));
  };

  return (
    <div className={style.myPokemon}>
      <button onClick={() => navigate('/')}>포켓몬 잡으러 가기</button>
      <h1>내 포켓몬 북</h1>
      <div className={style.utils}>
        <form className={style.form}>
          <label htmlFor="pokemon-input" className={style.form_label}>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                stroke="currentColor"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </label>
          <input
            id="pokemon-input"
            type="text"
            placeholder="검색"
            value={searchQuery}
            onChange={handleSearch}
            className={`${style.form_input} ${searchQuery ? style.clear : ''}`}
          />
          <button onClick={handleClearQuery} className={`${style.form_clear} ${searchQuery && style.isActive}`}>
            <span></span>
          </button>
        </form>
        <select>
          <option value="좋아요 순">좋아요 순</option>
          <option value="포획 순">포획 순</option>
          <option value="유형">유형</option>
          <option value="성별">성별</option>
        </select>
      </div>
      {isPending && <span>Spinner~</span>}
      {displayedPokemon && displayedPokemon.length !== 0 ? (
        <ul className={style.myPokemon_list}>
          {displayedPokemon?.map(mon => {
            return (
              <li key={mon.id} className={style.myPokemon_item} onClick={() => handleModal(mon, mon.id, mon.name)}>
                <img src={mon.url} alt={mon.name} />
                <PokemonType key={mon.id} type={mon.types[0].type.name} styles={style.myPokemon_name}>
                  {mon.name}
                </PokemonType>
                <LikedButton myPokemon={myPokemon} targetId={mon.id} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={style.myPokemon_no_list}>
          <strong>No Results!</strong>
        </div>
      )}
      <Modal isOpen={isModalOpen !== null} onClose={() => setIsModalOpen(null)}>
        {isModalOpen !== null && (
          <>
            <div className={style.img_box}>
              <img src={isModalOpen.url} alt={isModalOpen.name} className={style.img} />
            </div>
            <div className={style.img_info}>
              <h2>이름: {isModalOpen.name}</h2>
              <div>설명: </div>
              <div>스탯: </div>
              <div>진화: </div>
              <div>스킬: </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
