import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import ContentCard from '../Components/Common/ContentCard/ContentCard';
import Head2HeadContainer from '../Components/Head2Head/Head2HeadContainer';
import LeagueInfoContainer from '../Components/LeagueInfo/LeagueInfoContainer';

function League(): ReactElement {
  const { playerId } = useParams();
  return (
    <div className={`grid ${playerId ? 'grid-cols-1 2xl:grid-cols-2' : 'grid-cols-1'} dark:bg-darkmode-background`}>

      <ContentCard>
        <LeagueInfoContainer />
      </ContentCard>
      {playerId ? (
        <ContentCard>
          <Head2HeadContainer />
        </ContentCard>
      )
        : null}

    </div>

  );
}

export default League;
