/* eslint-disable no-nested-ternary */
import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { LeagueContext } from '../App';
import ContentCard from '../Components/Common/ContentCard/ContentCard';
import FormTable from '../Components/FormTable/FormTable';
import LeagueTable from '../Components/LeagueTable/LeagueTable';
import { ILeagueTableDetails } from '../interfaces/League';
import mapLeagueTableDetails from '../interfaces/Mapper';

function Table(): ReactElement {
  const {
    standings,
    draftPlayerStats,
  } = useContext(LeagueContext);
  const [leagueRows, setLeagueRows] = useState<ILeagueTableDetails[]>([] as ILeagueTableDetails[]);

  useEffect(() => {
    const leagueTableDetails: ILeagueTableDetails[] = [];
    standings.forEach((standing) => {
      leagueTableDetails.push(
        mapLeagueTableDetails(standing, draftPlayerStats.find((playerStat) => playerStat.playerId === standing.playerId)),
      );
    });
    setLeagueRows(leagueTableDetails);
  }, []);

  return (
    <div className="grid grid-cols-1 dark:bg-darkmode-background">
      <ContentCard>
        <LeagueTable rows={leagueRows} />
      </ContentCard>
      <ContentCard>
        <FormTable rows={draftPlayerStats} />
      </ContentCard>
    </div >

  );
}

export default Table;
