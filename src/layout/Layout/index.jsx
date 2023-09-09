import style from './index.module.scss';

const Title = ({ children }) => {
  return <h1 className={style.title}>{children}</h1>;
};

const Contents = ({ children }) => {
  return <section className={style.contents}>{children}</section>;
};

export const Layout = ({ children }) => {
  return <>{children}</>;
};

Layout.Title = Title;
Layout.Contents = Contents;
