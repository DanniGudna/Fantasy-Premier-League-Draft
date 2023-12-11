import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { LeagueContext } from '../App';
import ContentCard from '../Components/Common/ContentCard/ContentCard';
import FormTable from '../Components/FormTable/FormTable';
import ChartContainer from '../Components/LeagueCharts/ChartContainer';
import LeagueInfoContainer from '../Components/LeagueInfo/LeagueInfoContainer';
import LeagueTable from '../Components/LeagueTable/LeagueTable';

function League(): ReactElement {
  const {
    standings,
    draftPlayerForms,
  } = useContext(LeagueContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(!standings);
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
              <LeagueTable rows={standings} />
            </ContentCard>
            <ContentCard>
              <FormTable rows={draftPlayerForms} />
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
