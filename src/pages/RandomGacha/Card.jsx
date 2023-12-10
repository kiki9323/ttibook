import { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { PokemonType } from '@components/PokemonType';
import { pokemonTypeTranslationAndColor } from '@/utils/constants';
import style from './index.module.scss';

const Front = ({ forwardedRef, id, name, imageSrc, types }) => {
  const cardRef = useRef(null);

  const setCardRef = element => {
    cardRef.current = element;
    if (forwardedRef) {
      forwardedRef.current = element;
    }
  };

  console.log(types);
  return (
    <div className={`${style.card_front}`} ref={setCardRef}>
      <span id="shinyEffect" className={style.effect}></span>
      <div className={style.card_img}>
        <PokemonType typeName={types && types[0].type.name} styles={style.card_name}>
          <span className={style.card_id}>#{id}</span>
          {name}
        </PokemonType>
        <img src={imageSrc} alt={name} />
      </div>
    </div>
  );
};

const Back = ({ id, abilities, types, height, weight }) => {
  return (
    <div className={`${style.card_back}`}>
      <dl className={style.card_summary}>
        <div className={style.card_summary_item}>
          <dt>타입</dt>
          {types?.map(({ type }, i) => (
            <dd key={i}>
              <PokemonType key={i} typeName={type.name}>
                {type.name.ko}
              </PokemonType>
            </dd>
          ))}
        </div>
        <div className={style.card_summary_item}>
          <dt>능력</dt>
          <dd>
            <ul>
              {abilities?.map(({ ability }, idx) => (
                <li key={idx}>{ability.name}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div className={style.card_summary_item}>
          <dt className={style.attr_height}>키</dt>
          <dd>{height}</dd>
          <dt className={style.attr_height}>몸무게</dt>
          <dd>{weight}</dd>
        </div>
      </dl>
      <div className={style.more}>
        <Link to={`/random-gacha/${id}`} className={style.more_btn}>
          잡으러 가기
        </Link>
      </div>
      <Card.Watermark />
    </div>
  );
};

const Watermark = ({ children = 'TTIBOOK '.repeat(30) }) => {
  return <div className={style.watermark}>{children}</div>;
};

export const Card = ({ children }) => {
  const [isFlip, setIsFlip] = useState(false);
  const isFlipActive = isFlip ? style.is_active : null;

  return (
    <div role="button" className={`${style.card} ${isFlipActive}`} onClick={() => setIsFlip(prev => !prev)}>
      {children}
    </div>
  );
};

Card.Front = Front;
Card.Back = Back;
Card.Watermark = Watermark;
