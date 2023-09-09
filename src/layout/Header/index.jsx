import { Link, useNavigate } from 'react-router-dom';

import { CaptureContext } from '@/context/IsCapturedContext';
import style from './index.module.scss';
import { useContext } from 'react';
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
            <li className={`${isCapture ? style.is_active : ''}`}>
              <button type="button" onClick={() => navigate('/mybook')}>
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
