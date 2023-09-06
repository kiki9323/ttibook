import { Header } from '@/layout/Header';
import { Outlet } from 'react-router-dom';
import style from './index.module.scss';

export const RootLayout = () => {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
    </>
  );
};
