import style from './index.module.scss';

export const DeleteButton = ({ targetId, setDisplayedPokemon }) => {
  const LOCAL_KEY_MYMONSTER = 'myMonster';
  const localData = localStorage.getItem(LOCAL_KEY_MYMONSTER);
  const parsedData = JSON.parse(localData) || [];

  const handleDelete = e => {
    e.stopPropagation();
    localStorage.setItem(LOCAL_KEY_MYMONSTER, JSON.stringify(parsedData.filter(item => item.id !== targetId)));
    setDisplayedPokemon(JSON.parse(localStorage.getItem(LOCAL_KEY_MYMONSTER)));
  };

  return (
    <button onClick={handleDelete} className={`${style.delete_icon} ${style.delete_poke}`}>
      <span></span>
    </button>
  );
};
