import style from './index.module.scss';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modal}>
      <dialog className={style.modal_inner}>
        <button onClick={onClose} className={style.close_btn}>
          <span className={style.close_icon}></span>
        </button>
        <div className={style.modal_content}>
          {title && <strong>{title}</strong>}
          {children}
        </div>
      </dialog>
      <div onClick={onClose} className={style.modal_overlay}></div>
    </div>
  );
};
