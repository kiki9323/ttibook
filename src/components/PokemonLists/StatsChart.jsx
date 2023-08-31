import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';

import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const StatsChart = ({ statData, color, name }) => {
  const [pokeLabels, setPokeLabels] = useState([]);
  const [pokedatas, setPokeDatas] = useState([]);

  const colorNameToHex = color => {
    const colors = {
      black: {
        backgroundColor: '#0000004b',
        borderColor: '#000',
      },
      white: {
        backgroundColor: '#ffffffc3',
        borderColor: '#dbdbdb',
      },
      red: {
        backgroundColor: '#ff000046',
        borderColor: '#ff0000',
      },
      blue: {
        backgroundColor: '#0062ff51',
        borderColor: '#0062ff',
      },
      yellow: {
        backgroundColor: '#fbfb799d',
        borderColor: '#fbe04c',
      },
      green: {
        backgroundColor: '#7fdb7fa4',
        borderColor: '#4dc489',
      },
      purple: {
        backgroundColor: '#ed7cf3a3',
        borderColor: '#c36ce9',
      },
      pink: {
        backgroundColor: '#ff83b289',
        borderColor: '#fa8af4',
      },
      brown: {
        backgroundColor: '#f9a76c80',
        borderColor: '#cb8a62',
      },
      default: {
        backgroundColor: '#c5ffe746',
        borderColor: '#a0ffd796',
      },
    };
    return colors[color.toLowerCase()] || colors['default'];
  };

  console.log(color);

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
            size: 14,
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
