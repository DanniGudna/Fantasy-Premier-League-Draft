/* eslint-disable no-nested-ternary */
import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LeagueContext } from '../App';
import ContentCard from '../Components/Common/ContentCard/ContentCard';
import PrimaryButton from '../Components/Common/PrimaryButtons/PrimaryButton';
import TextInput from '../Components/Common/TextInput/TextInput';
import FormTable from '../Components/FormTable/FormTable';
import ChartContainer from '../Components/LeagueCharts/ChartContainer';
import LeagueInfoContainer from '../Components/LeagueInfo/LeagueInfoContainer';

function Player(): ReactElement {
  /*   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false); */
  const { playerNumber } = useParams();
  const { draftPlayerForms } = useContext(LeagueContext);

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 dark:bg-slate-750">
      <ContentCard>
        <LeagueInfoContainer />
      </ContentCard>
      <ContentCard>
        <FormTable
          rows={draftPlayerForms.filter((draftPlayerForm) => draftPlayerForm.playerId.toString() === playerNumber)}
        />
      </ContentCard>
    </div>

  );
}

export default Player;
