import { useEffect, useState, useTransition } from 'react';

import { DeleteButton } from './DeleteButton';
import { Layout } from '../../layout/Layout/index';
import { LikedButton } from '../../components/LikedButton/index';
import { Modal } from '../../components/Modal/index';
import { POKEMON_LIKED_KEY } from '@/utils/constants';
import { PokemonType } from '@components/PokemonType';
import style from './index.module.scss';
import useLocalStorage from '../../hooks/useLocalStroage';

export const PokemonBook = () => {

  const [state, setState] = useLocalStorage(POKEMON_LIKED_KEY, []);
  const [displayedPokemon, setDisplayedPokemon] = useState(state);

  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSearch = e => {
    const searchQueryValue = e.target.value;
    const filteredData = displayedPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQueryValue.toLowerCase()),
    );
    setSearchQuery(searchQueryValue);

    if (!searchQueryValue || searchQueryValue.length === 0) {
      setDisplayedPokemon(state);
    } else {
      startTransition(() => {
        setDisplayedPokemon(filteredData);
      });
    }
  };

  const handleClearQuery = e => {
    e.preventDefault();
    setSearchQuery('');
    setDisplayedPokemon(state);
  };

  const handleModal = mon => {
    console.log(mon);
    setIsModalOpen(displayedPokemon.find(p => p.id === mon.id));
  };

  const handleDelete = (targetId) => {
    const newState = state.filter(item => item.id !== targetId);
    setState(newState)
    setDisplayedPokemon(newState);
  };

  const handleLiked = (targetId) => {
    const newState = state.map(item => 
      item.id === targetId ? { ...item, liked: !item.liked } : item
    );
    console.log(newState);
    setState(newState)
    setDisplayedPokemon(newState);
  }

  useEffect(() => {
    setDisplayedPokemon(state);
  }, [state]);
  
  return (
    <Layout>
      <Layout.Title>MYBOOK</Layout.Title>
      <Layout.Contents>
        <div className={style.my_pokemon}>
          <div className={style.utils}>
            <form>
              <div className={style.input_wrap}>
                <label htmlFor="pokemon-input" className={style.input_label}>
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
                  className={`${style.input} ${searchQuery ? style.clear : ''}`}
                />
                <button
                  onClick={handleClearQuery}
                  className={`${style.delete_icon} ${!searchQuery && style.is_inactive}`}
                >
                  <span></span>
                </button>
              </div>
            </form>
          </div>
          {isPending && <span>Spinner~</span>}
          {displayedPokemon && displayedPokemon.length !== 0 ? (
            <ul className={style.my_pokemon_list}>
              {displayedPokemon?.map(mon => {
                return (
                  <li key={mon.id} className={style.my_pokemon_item} onClick={() => handleModal(mon, mon.id, mon.name)}>
                    <img src={mon.url} alt={mon.name} />
                    <PokemonType key={mon.id} typeName={mon.types[0].type.name} styles={style.my_pokemon_name}>
                      {mon.name}
                    </PokemonType>
                    <LikedButton pokemon={mon} onLiked={handleLiked} />
                    <DeleteButton targetId={mon.id} onRemove={handleDelete} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={style.my_pokemon_no_list}>
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
      </Layout.Contents>
    </Layout>
  );
};
