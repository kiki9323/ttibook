import { Link } from 'react-router-dom';
import { PokemonType } from '@components/PokemonType';
import React from 'react';
import style from './index.module.scss';

const Front = ({ id, name, imageSrc, types }) => {
  return (
    <div className={style.card_front}>
      <div className={style.card_img}>
        {types.map(({ type }, i) => (
          <PokemonType key={i} type={type.name} className={style.name_type}>
            <span className={style.card_id}>#{id}</span>
            {name}
          </PokemonType>
        ))}
        <img src={imageSrc} alt={name} />
      </div>
    </div>
  );
};

const Back = ({ id, abilities, types, height }) => {
  return (
    <div className={style.card_back}>
      <dl className={style.card_summary}>
        <dt>능력</dt>
        <dd>
          <ul>
            {abilities.map(({ ability }, idx) => (
              <li key={idx}>{ability.name}</li>
            ))}
          </ul>
        </dd>
        <dt>타입</dt>
        {types.map(({ type }, i) => (
          <dd key={i}>
            <PokemonType key={i} type={type.name}>
              {type.name}
            </PokemonType>
          </dd>
        ))}
        <dt>키</dt>
        <dd>{height}</dd>
      </dl>
      <div className={style.more}>
        <Link to={`/pokemon/${id}`} className={style.more_btn}>
          상세 정보 보기
        </Link>
      </div>
      <Card.Watermark />
    </div>
  );
};

const Watermark = ({ children = 'TTIBOOK '.repeat(30) }) => {
  return <div className={style.watermark}>{children}</div>;
};

export const Card = ({ gachaPokemon }) => {
  return (
    <>
      <div className={style.card}>
        <Card.Front
          id={gachaPokemon.id}
          types={gachaPokemon.types}
          name={gachaPokemon.name}
          imageSrc={gachaPokemon.sprites.other['official-artwork'].front_default}
        />
        <Card.Back
          id={gachaPokemon.id}
          types={gachaPokemon.types}
          abilities={gachaPokemon.abilities}
          height={gachaPokemon.height}
        />
      </div>
    </>
  );
};

Card.Front = Front;
Card.Back = Back;
Card.Watermark = Watermark;
