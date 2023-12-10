// import { getRandomNumber, langFilterAndAccessor } from '@/utils/utils';
// import { useEffect, useRef, useState } from 'react';

// import { Card } from './Card';
// import { DownLoadButton } from '../../components/DownLoadButton/index';
// import { ErrorComponent } from '@components/ErrorComponent';
// import { Layout } from '../../layout/Layout/index';
// import { LoadingComponent } from '@components/LoadingComponent';
// import style from './index.module.scss';
// import usePokemonAndSpecies from '@/hooks/useGetPokemonAndSpecies';

// export const RandomGacha = () => {
//   const savedCardRef = useRef();
//   const [randomId, setRandomId] = useState(null);
//   const [showCard, setShowCard] = useState(false);
//   const [notification, setNotification] = useState('');
//   const { pokemonData, speciesData, isLoading, isError, error } = usePokemonAndSpecies(randomId);
//   const [gachaPokemon, setGachaPokemon] = useState(null);
//   const NOTI_TIME = 1500;
//   const timerId = useRef();

//   const handleGacha = async () => {
//     setRandomId(getRandomNumber(1000));
//   };

//   useEffect(() => {
//     setShowCard(false);

//     if (pokemonData && speciesData) {
//       const koName = langFilterAndAccessor(speciesData.names, 'ko', 'name');

//       // setGachaPokemon(pokemonData);
//       const notiText = (
//         <>
//           포켓몬 {koName} <br /> (ID: {pokemonData.id})을(를) 뽑았다!
//         </>
//       );
//       setNotification(notiText);

//       timerId.current = setTimeout(() => {
//         setNotification('');
//         setShowCard(true);
//         setGachaPokemon(pokemonData);
//       }, NOTI_TIME);
//     }

//     return () => clearTimeout(timerId.current);
//   }, [randomId, pokemonData]);

//   if (isLoading) return <LoadingComponent loadingMessage={'뽑는 중...'} />;
//   if (isError) return <ErrorComponent errorMessage={error.message} />;

//   return (
//     <Layout>
//       <Layout.Title>랜덤 뽑기</Layout.Title>
//       <Layout.Contents>
//         <div className={style.gacha}>
//           <button type="button" onClick={handleGacha} className={style.gacha_btn}>
//             랜덤 포켓몬 뽑기
//           </button>
//           <div>
//             {gachaPokemon && (
//               <>
//                 <div className={style.notification}>{notification}</div>
//                 <DownLoadButton fileName={pokemonData.name} forwardedRef={savedCardRef} />
//                 {showCard && (
//                   <Card>
//                     <Card.Front
//                       forwardedRef={savedCardRef}
//                       id={gachaPokemon.id}
//                       types={gachaPokemon.types}
//                       name={langFilterAndAccessor(speciesData.names, 'ko', 'name')}
//                       imageSrc={gachaPokemon.sprites.other['official-artwork'].front_default}
//                     />
//                     <Card.Back
//                       id={gachaPokemon.id}
//                       types={gachaPokemon.types}
//                       abilities={gachaPokemon.abilities}
//                       height={gachaPokemon.height}
//                       weight={gachaPokemon.weight}
//                     />
//                   </Card>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </Layout.Contents>
//     </Layout>
//   );
// };

import { getRandomNumber, langFilterAndAccessor } from '@/utils/utils';
import { useEffect, useRef, useState } from 'react';

import { Card } from './Card';
import { DownLoadButton } from '../../components/DownLoadButton/index';
import { ErrorComponent } from '@components/ErrorComponent';
import { Layout } from '../../layout/Layout/index';
import { LoadingComponent } from '@components/LoadingComponent';
import style from './index.module.scss';
import usePokemonAndSpecies from '@/hooks/useGetPokemonAndSpecies';

export const RandomGacha = () => {
  const savedCardRef = useRef();
  const [randomId, setRandomId] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [notification, setNotification] = useState('');
  const { pokemonDetailData, isLoading, isError, error } = usePokemonAndSpecies(randomId);
  const [gachaPokemon, setGachaPokemon] = useState(null);
  const NOTI_TIME = 1500;
  const timerId = useRef();

  const handleGacha = async () => {
    setRandomId(getRandomNumber(1000));
  };

  useEffect(() => {
    setShowCard(false);

    if (pokemonDetailData) {
      const notiText = (
        <>
          포켓몬 {pokemonDetailData.koName} <br /> (ID: {randomId})을(를) 뽑았다!
        </>
      );
      setNotification(notiText);

      timerId.current = setTimeout(() => {
        setNotification('');
        setShowCard(true);
        setGachaPokemon(pokemonDetailData);
      }, NOTI_TIME);
    }

    return () => clearTimeout(timerId.current);
  }, [randomId]);

  if (isLoading) return <LoadingComponent loadingMessage={'뽑는 중...'} />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  return (
    <Layout>
      <Layout.Title>랜덤 뽑기</Layout.Title>
      <Layout.Contents>
        <div className={style.gacha}>
          <button type="button" onClick={handleGacha} className={style.gacha_btn}>
            랜덤 포켓몬 뽑기
          </button>
          <div>
            {gachaPokemon && (
              <>
                <div className={style.notification}>{notification}</div>
                <DownLoadButton fileName={pokemonDetailData.name} forwardedRef={savedCardRef} />
                {showCard && (
                  <Card>
                    <Card.Front
                      forwardedRef={savedCardRef}
                      id={randomId}
                      types={pokemonDetailData.types}
                      name={pokemonDetailData.koName}
                      imageSrc={pokemonDetailData && pokemonDetailData.sprites?.other['official-artwork'].front_default}
                    />
                    <Card.Back
                      id={randomId}
                      types={pokemonDetailData.types}
                      abilities={pokemonDetailData.abilities}
                      height={pokemonDetailData.height}
                      weight={pokemonDetailData.weight}
                    />
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
