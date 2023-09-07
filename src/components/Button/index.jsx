import style from './index.module.scss';

export const Button = ({ ariaLabel, onClick, isToggled, buttonText, variant, crossIcon, children }) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${style.button} ${variant ? style[variant] : ''}`}
    >
      {buttonText ? <span>{buttonText}</span> : null}
      <span className={crossIcon ? style.cross_icon : null}></span>
      {typeof children !== 'function' ? children : children(isToggled)}
    </button>
  );
};
