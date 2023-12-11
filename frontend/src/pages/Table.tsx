/* eslint-disable no-nested-ternary */
import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext } from 'react';

import { LeagueContext } from '../App';
import ContentCard from '../Components/Common/ContentCard/ContentCard';
import FormTable from '../Components/FormTable/FormTable';
import LeagueTable from '../Components/LeagueTable/LeagueTable';

function Table(): ReactElement {
  const {
    standings,
    draftPlayerForms,
  } = useContext(LeagueContext);
  console.log('🚀 ~ file: Table.tsx:16 ~ Table ~ standings:', standings);

  return (
    <div className="grid grid-cols-1  dark:bg-darkmode-background">
      <ContentCard>
        <LeagueTable rows={standings} />
      </ContentCard>
      <ContentCard>
        <FormTable rows={draftPlayerForms} />
      </ContentCard>
    </div >

  );
}

export default Table;
