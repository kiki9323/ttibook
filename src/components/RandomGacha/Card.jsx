import React from 'react'
import style from './index.module.scss'

export const Card = ({ gachaPokemon }) => {
  return (
    <div className={style.card}>
      <div className={style.card_front}>
        <div className={style.card_img}>
          <p className={`${style.tag} ${style.name}`}>{gachaPokemon.name}</p>
          <img
            src={gachaPokemon.sprites.front_default}
            alt={gachaPokemon.name}
          />
        </div>
      </div>
      <div className={style.card_back}>
        <ul>
          <p>능력:</p>
          {gachaPokemon.abilities.map((v, idx) => (
            <li key={idx}>{v.ability.name}</li>
          ))}
        </ul>
        <p>타입: {gachaPokemon.types[0]['type'].name}</p>
        <p>키: {gachaPokemon.height}</p>
        <div className={style.watermark}>
          TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK
          TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK
          TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK TTIBOOK
        </div>
      </div>
    </div>
  )
}
