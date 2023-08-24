import { Link, useNavigate } from 'react-router-dom';

import React from 'react';
import style from './index.module.scss';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className={style.inner}>
        <Link to={'/'}>
          <h1>TTIBOOK</h1>
        </Link>
        <nav>
          <ul>
            {/* <li>언어</li>
            <li>다크모드</li>
            <li>로그인하기</li> */}
            <li>
              <button onClick={() => navigate('/myCollection')}>내 포켓몬 북</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
