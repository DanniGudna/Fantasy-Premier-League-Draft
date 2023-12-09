/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FantasyPremierLeagueApi } from '../api';
import { LeagueContext } from '../App';
import ContentCard from '../Components/Common/ContentCard/ContentCard';
import FormTable from '../Components/FormTable/FormTable';
import ChartContainer from '../Components/LeagueCharts/ChartContainer';
import LeagueInfoContainer from '../Components/LeagueInfo/LeagueInfoContainer';
import LeagueTable from '../Components/LeagueTable/LeagueTable';
import Loading from '../Components/Loading/Loading';
import { IDraftPlayer, IDraftPlayerForm, IDraftPlayerStanding } from '../interfaces/League';
import { getPlayerForm, getPlayerStandings } from '../Utils/Utils';

const fantasyPremierLeagueApi = new FantasyPremierLeagueApi();

function League(): ReactElement {
  const {
    selectedSeason,
  } = useContext(LeagueContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(!selectedSeason);
  }, []);

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 dark:bg-darkmode-background">
      {error ? (
        <div className="2xl:col-span-2 flex justify-center items-center">
          <ContentCard>
            <p className="text-black dark:text-darkmode-text">Failed to get league with this ID, config files might be off or fallback might not work</p>
          </ContentCard>
        </div>
      )
        : (
          <>
            <ContentCard>
              <LeagueTable rows={selectedSeason.standings} />
            </ContentCard>
            <ContentCard>
              <FormTable rows={selectedSeason.draftPlayerForms} />
            </ContentCard>
            <ContentCard>
              <LeagueInfoContainer />
            </ContentCard>
            <ContentCard>
              <ChartContainer />
            </ContentCard>
          </>
        )}
    </div>

  );
}

export default League;
