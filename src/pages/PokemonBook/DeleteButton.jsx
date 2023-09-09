import style from './index.module.scss';

export const DeleteButton = ({ targetId, onRemove }) => {

  const handleDelete = e => {
    e.stopPropagation();
    onRemove(targetId);
  };

  return (
    <button type="button" onClick={handleDelete} className={`${style.delete_icon} ${style.delete_poke}`}>
      <span></span>
    </button>
  );
};
