import style from './index.module.scss';
import { useState } from 'react';

export const DropBox = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropBoxStyle = isOpen ? style.isShow : '';

  return (
    <div className={style.dropbox}>
      <strong onClick={() => setIsOpen(prev => !prev)} className={style.dropbox_btn}>
        {title}
      </strong>
      <div className={`${style.dropbox_content} ${dropBoxStyle}`}>{children}</div>
    </div>
  );
};
