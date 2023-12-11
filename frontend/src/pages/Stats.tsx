import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

import ContentCard from '../Components/Common/ContentCard/ContentCard';
import LeagueInfoContainer from '../Components/LeagueInfo/LeagueInfoContainer';

function League(): ReactElement {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 dark:bg-darkmode-background">

      <ContentCard>
        <LeagueInfoContainer />
      </ContentCard>

    </div>

  );
}

export default League;
