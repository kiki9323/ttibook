import style from './index.module.scss';

export const PokemonAbilities = ({ abilities, habitat, capture_rate, genus, color, height, weight }) => {
  return (
    <>
      <dt>분류</dt>
      <dd>{genus}</dd>
      <dt>키 | 몸무게</dt>
      <dd>
        {height * 10} cm | {weight / 10} kg
      </dd>
      <dt>능력</dt>
      <dd>
        {abilities.map((item, idx) => (
          <span key={idx} className={style.info_ability}>
            {item.ability.name}
          </span>
        ))}
      </dd>
      <dt>서식지</dt>
      <dd>{habitat?.name ?? '(알 수 없음)'}</dd>
      <dt>포획률</dt>
      <dd>{capture_rate} / 255</dd>
      <dt>상징 색</dt>
      <dd>
        <span className={style.info_color} style={{ backgroundColor: `${color.name}` }}></span>
        {color.name}
      </dd>
    </>
  );
};
