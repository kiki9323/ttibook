import { Link } from 'react-router-dom'
import { PokemonType } from '@components/PokemonType'
import React from 'react'
import style from './index.module.scss'

const Front = ({ name, imageSrc, types }) => {
  return (
    <div className={style.card_front}>
      <div className={style.card_img}>
        {types.map(({ type }, i) => (
          <PokemonType key={i} type={type.name}>
            {name}
          </PokemonType>
        ))}
        <img src={imageSrc} alt={name} />
      </div>
    </div>
  )
}

const Back = ({ id, abilities, typeName, height }) => {
  return (
    <div className={style.card_back}>
      <ul>
        <p>능력:</p>
        {abilities.map(({ ability }, idx) => (
          <li key={idx}>{ability.name}</li>
        ))}
      </ul>
      <p>타입: {typeName}</p>
      <p>키: {height}</p>
      <Link to={`/pokemon/${id}`}>상세 정보 보기</Link>
      <Card.Watermark />
    </div>
  )
}

const Watermark = ({ children = 'TTIBOOK'.repeat(30) }) => {
  return <div className={style.watermark}>{children}</div>
}

export const Card = ({ gachaPokemon }) => {
  return (
    <div className={style.card}>
      <Card.Front
        name={gachaPokemon.name}
        imageSrc={gachaPokemon.sprites.front_default}
        types={gachaPokemon.types}
      />
      <Card.Back
        id={gachaPokemon.id}
        abilities={gachaPokemon.abilities}
        typeName={gachaPokemon.types[0]['type'].name}
        height={gachaPokemon.height}
      />
    </div>
  )
}

Card.Front = Front
Card.Back = Back
Card.Watermark = Watermark
