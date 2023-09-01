import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';

import { Radar } from 'react-chartjs-2';
import { pokemonStatsChartColors } from '@/utils/constants';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const StatsChart = ({ statData, color, name }) => {
  const [pokeLabels, setPokeLabels] = useState([]);
  const [pokedatas, setPokeDatas] = useState([]);

  const colorNameToHex = color => {
    return pokemonStatsChartColors[color.toLowerCase()] || pokemonStatsChartColors['default'];
  };

  useEffect(() => {
    let newPokeLabels = [];
    let newPokeDatas = [];

    statData.forEach(obj => {
      newPokeLabels = [...newPokeLabels, ...Object.keys(obj)];
      newPokeDatas = [...newPokeDatas, ...Object.values(obj)];
    });

    setPokeLabels(newPokeLabels);
    setPokeDatas(newPokeDatas);
  }, [statData]);

  const suggestedMinDefault = Math.min(...pokedatas) - 40;
  const suggestedMaxDefault = Math.max(...pokedatas) + 20;

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: suggestedMinDefault ? 0 : suggestedMinDefault,
        suggestedMax: suggestedMaxDefault,
        pointLabels: {
          font: {
            size: 20,
            family: 'NeoDunggeunmo',
          },
        },
      },
    },
  };

  const pokeLabelsLineBreak = pokeLabels.map(label => {
    if (label.includes('-')) {
      return label.split('-');
    }
    return label;
  });

  const data = {
    labels: pokeLabelsLineBreak,
    datasets: [
      {
        label: name,
        showTooltips: false,
        data: pokedatas,
        fill: true,
        backgroundColor: colorNameToHex(color).backgroundColor,
        borderColor: colorNameToHex(color).borderColor,
      },
    ],
  };

  return <Radar data={data} options={options} />;
};
