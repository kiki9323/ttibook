import { useCallback, useEffect, useState } from 'react';

import { LikedButton } from '../LikedButton';
import { Modal } from '../Modal';
import { PokemonType } from '@components/PokemonType';
import { debounce } from 'lodash';
import style from './index.module.scss';
import { useNavigate } from 'react-router-dom';

export const PokemonBook = () => {
  const navigate = useNavigate();
  const initialData = JSON.parse(localStorage.getItem('myMonster'));
  const [myPokemon, setMyPokemon] = useState(initialData);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleModal = (id, name) => {
    const liked = () => myPokemon.find(p => p.id === id);
    setSelectedPokemon(liked);
  };

  const debouncedHandleSearch = useCallback(
    debounce(keyword => {
      if (searchKeyword === keyword) return;
      setSearchKeyword(keyword);
    }, 100),
    [searchKeyword],
  );

  const handleSearch = useCallback(
    e => {
      const keyword = e.target.value;
      debouncedHandleSearch(keyword);
    },
    [searchKeyword],
  );

  const filterPokemonList = () => {
    if (!searchKeyword) return myPokemon;
    return myPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchKeyword.toLowerCase()));
  };

  const filteredData = filterPokemonList(searchKeyword);

  useEffect(() => {
    if (!searchKeyword || searchKeyword.length === 0) {
      setMyPokemon(initialData);
    } else {
      setMyPokemon(filteredData);
    }
  }, [searchKeyword]);

  return (
    <div className={style.myPokemon}>
      <button onClick={() => navigate('/')}>포켓몬 잡으러 가기</button>
      <h1>내 포켓몬 북</h1>
      <div className={style.boox_utils}>
        <input
          type="text"
          placeholder="검색"
          value={searchKeyword}
          onChange={handleSearch}
          style={{ border: '2px solid black', padding: '12px 30px', borderRadius: '20px' }}
        />
        <select>
          <option value="좋아요 순">좋아요 순</option>
          <option value="포획 순">포획 순</option>
          <option value="유형">유형</option>
          <option value="성별">성별</option>
        </select>
      </div>
      {myPokemon ? (
        <ul className={style.myPokemon_list}>
          {Array.from(myPokemon).map(mon => {
            return (
              <li key={mon.id} className={style.myPokemon_item} onClick={() => handleModal(mon.id, mon.name)}>
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
          <strong>잡은 포켓몬이 없어요!</strong>
          <button onClick={() => navigate('/')}>포켓몬 잡으러 가기</button>
        </div>
      )}

      <Modal isOpen={selectedPokemon !== null} onClose={() => setSelectedPokemon(null)}>
        {selectedPokemon !== null && (
          <>
            <div className={style.img_box}>
              <img src={selectedPokemon.url} alt={selectedPokemon.name} className={style.img} />
            </div>
            <div className={style.img_info}>
              <h2>{selectedPokemon.name}</h2>
              <div>설명</div>
              <div>스탯</div>
              <div>진화</div>
              <div>스킬</div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
