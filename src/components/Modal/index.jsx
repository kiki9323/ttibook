import style from './index.module.scss';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className={style.modal}>
      <div className={style.modal_inner}>
        <button onClick={onClose} className={style.close_btn}>
          <span className={style.close_icon}></span>
        </button>
        <div className={style.modal_content}>{children}</div>
      </div>
    </div>
  );
};
