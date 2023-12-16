/* eslint-disable no-nested-ternary */
import 'tailwindcss/tailwind.css';

import {
  CategoryScale, Chart as ChartJS,
  Legend, LinearScale, LineElement, PointElement, Title, Tooltip,
} from 'chart.js';
import React, { ReactElement, useContext } from 'react';
import { Line } from 'react-chartjs-2';

import { LeagueContext } from '../App';
import ContentCard from '../Components/Common/ContentCard/ContentCard';
import InfoHeader from '../Components/InfoHeader/InfoHeader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
  Title,
);

// options for the rank chart
const rankOptions = {
  scales: {
    y: {
      reverse: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

function Charts(): ReactElement {
  const { chartData, leagueName, seasonName } = useContext(LeagueContext);

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 w-full">
      <ContentCard>
        <InfoHeader title="LeaguePoints over time" subTitle={leagueName + ' ' + seasonName} />
        <div className="text-black dark:text-white mt-4">
          <Line data={chartData.leaguePointsData} />
        </div>
      </ContentCard>
      <ContentCard>
        <InfoHeader title="Points over time" subTitle={leagueName + ' ' + seasonName} />
        <div className="text-black dark:text-white mt-4" >
          <Line data={chartData.pointsData} />
        </div>
      </ContentCard>
      <ContentCard>
        <InfoHeader title="Rank over time" subTitle={leagueName + ' ' + seasonName} />
        <div className="text-black dark:text-white mt-4" >
          <Line data={chartData.rankData} options={rankOptions} />
        </div>
      </ContentCard>
      <ContentCard>
        <p className="text-black dark:text-white">More charts planned in later versions, for example stats over many seasons and more personilized charts</p>
      </ContentCard>
    </div >

  );
}

export default Charts;
