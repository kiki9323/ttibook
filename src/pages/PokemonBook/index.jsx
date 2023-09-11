import { useCallback, useEffect, useState, useTransition } from 'react';

import { DisplayedPokemonList } from './DisplayedPokemonList';
import { Layout } from '@layout/Layout';
import { Modal } from '../../components/Modal/index';
import ModalPortal from '../../hooks/usePortal';
import { POKEMON_LIKED_KEY } from '@/utils/constants';
import { SearchInput } from '../../components/SearchInput';
import style from './index.module.scss';
import useLocalStorage from '@/hooks/useLocalStroage';

export const PokemonBook = () => {
  const [state, setState] = useLocalStorage(POKEMON_LIKED_KEY, []);
  const [displayedPokemon, setDisplayedPokemon] = useState(state);

  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSearch = useCallback(
    e => {
      const searchQueryValue = e.target.value;
      const filteredData = state.filter(pokemon => pokemon.name.toLowerCase().includes(searchQueryValue.toLowerCase()));
      // Urgent: Show the typed
      setSearchQuery(searchQueryValue);

      if (!searchQueryValue || searchQueryValue.length === 0) {
        setDisplayedPokemon(state);
      } else {
        // Not Urgent: Show the results
        /**
         * startTransition에 래핑된 업데이트는 긴급하지 않은 것으로 처리되며 클릭이나 키 누름과 같은 더 긴급한 업데이트가 들어오는 경우 중단한다.
         * 사용자에 의해 전환이 중단되면 다음을 throw 함. 완료되지 않은 오래된 렌더링 작업을 제거하고 최신 업데이트만 렌더링.
         */
        startTransition(() => {
          setDisplayedPokemon(filteredData);
        });
      }
    },
    [state, setDisplayedPokemon],
  );

  const handleClearQuery = useCallback(
    e => {
      e.preventDefault();
      setSearchQuery('');
      setDisplayedPokemon(state);
    },
    [state, setDisplayedPokemon],
  );

  const handleDelete = targetId => {
    const newState = state.filter(item => item.id !== targetId);
    setState(newState);
    setDisplayedPokemon(newState);
  };

  const handleLiked = targetId => {
    const newState = state.map(item => (item.id === targetId ? { ...item, liked: !item.liked } : item));
    setState(newState);
    setDisplayedPokemon(newState);
  };

  const handleModal = mon => {
    console.log(mon);
    setIsModalOpen(displayedPokemon.find(p => p.id === mon.id));
  };

  useEffect(() => {
    setDisplayedPokemon(state);
  }, [state]);

  return (
    <Layout>
      <Layout.Title>MYBOOK</Layout.Title>
      <Layout.Contents>
        <div className={style.my_pokemon}>
          <div className={style.utils}>
            <SearchInput searchQuery={searchQuery} handleSearch={handleSearch} handleClearQuery={handleClearQuery} />
          </div>
          {isPending && <span>Spinner~</span>}
          {displayedPokemon && displayedPokemon.length !== 0 ? (
            <ul className={style.my_pokemon_list}>
              <DisplayedPokemonList
                displayedPokemon={displayedPokemon}
                handleModal={handleModal}
                handleLiked={handleLiked}
                handleDelete={handleDelete}
              />
            </ul>
          ) : (
            <div className={style.my_pokemon_no_list}>
              <strong>No Results!</strong>
            </div>
          )}
        </div>
        <ModalPortal>
          <Modal isOpen={isModalOpen !== null} onClose={() => setIsModalOpen(null)}>
            {isModalOpen !== null && (
              <>
                <div className={style.img_box}>
                  <img src={isModalOpen.url} alt={isModalOpen.name} className={style.img} />
                </div>
                <div className={style.img_info}>
                  <h2>이름: {isModalOpen.name}</h2>
                </div>
              </>
            )}
          </Modal>
        </ModalPortal>
      </Layout.Contents>
    </Layout>
  );
};
