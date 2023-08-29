import { Link, useNavigate } from 'react-router-dom';

import { CaptureContext } from '@/components/Context/captureContext';
import style from './index.module.scss';
import { useContext } from 'react';

export const Header = () => {
  const navigate = useNavigate();

  const { isCapture } = useContext(CaptureContext);
  return (
    <header>
      <div className={style.inner}>
        <Link to={'/'}>
          <h1>TTIBOOK</h1>
        </Link>
        <nav>
          <ul>
            {/* <li>언어</li>
            <li>로그인하기</li> */}
            <li>다크모드</li>
            <li className={`${isCapture ? style.isActive : ''}`}>
              <button onClick={() => navigate('/myCollection')}>MY</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
