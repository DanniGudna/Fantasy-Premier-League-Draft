import 'tailwindcss/tailwind.css';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { LeagueContext } from '../../App';
// import useDarkMode from '../../Hooks/UseDarkMode';
import { IAllChartData } from '../../interfaces/Generic';
import { createChartData } from '../../Utils/Utils';
import InfoHeader from '../InfoHeader/InfoHeader';

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

function ChartContainer(): ReactElement {
  // const [colorTheme] = useDarkMode(); // since chart.js doesnt use the tailwind dark mode we have the check the theme manually
  const { draftPlayerStandings } = useContext(LeagueContext);
  const [chartData, setChartData] = useState<IAllChartData>({} as IAllChartData);

  useEffect(() => {
    const data = createChartData(draftPlayerStandings);
    setChartData(data);
  }, []);

  return (
    <div>
      <InfoHeader title="Line Charts for the league" subTitle="tables made with chart.js" />
      {chartData?.leaguePointsData?.datasets.length > 0 ? (
        <div className="text-black dark:text-white mt-4">
          <p>LeaguePoints over time</p>
          <Line data={chartData.leaguePointsData} />
        </div>
      )
        : null}
      {chartData?.pointsData?.datasets.length > 0 ? (
        <div className="text-black dark:text-white mt-4" >
          <p>Points over time</p>
          <Line data={chartData.pointsData} />
        </div>
      )
        : null}
      {chartData?.rankData?.datasets.length > 0 ? (
        <div className="text-black dark:text-white mt-4" >

          <p>Rank over time</p>
          <Line data={chartData.rankData} options={rankOptions} />
        </div>
      )
        : null}

    </div>

  );
}

export default ChartContainer;
