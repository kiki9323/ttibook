import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { CaptureContext } from '@/components/Context/captureContext';
import style from './index.module.scss';
import useDarkMode from '@/hooks/useDarkMode';

export const Header = () => {
  const navigate = useNavigate();
  const { isCapture } = useContext(CaptureContext);
  const { theme, toggleTheme } = useDarkMode();

  return (
    <header>
      <div className={style.inner}>
        <Link to={'/'}>
          <h1>TTIBOOK</h1>
        </Link>
        <nav
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <ul>
            <li>
              <Link to={'/'}>
                <p>포켓몬도감</p>
              </Link>
            </li>
            <li>
              <Link to={'/random-gacha'}>
                <p>랜덤뽑기</p>
              </Link>
            </li>
            <li className={`${isCapture ? style.isActive : ''}`}>
              <button type="button" onClick={() => navigate('/my-collection')}>
                MYBOOK
              </button>
            </li>
          </ul>
        </nav>
        <div className="utils">
          <ul>
            <li>
              <button type="button" onClick={toggleTheme}>
                {theme === 'dark' ? '🌞' : '🌚'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
