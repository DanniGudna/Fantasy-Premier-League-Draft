/* eslint-disable no-nested-ternary */
import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UserContext } from '../App';
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
  const {
    setLeagueName,
    setDraftPlayers,
    standings,
    setStandings,
    draftPlayerForms,
    setDraftPlayerForms,
    matches,
    setMatches,
    setDraftPlayerStandings,
  } = useContext(UserContext);

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 dark:bg-slate-750">
      <ContentCard>
        {draftPlayerForms?.length > 0 ? (
          <LeagueInfoContainer />
        )
          : <p> This is not a H2H league so H2H info table cannot be shown</p>}
      </ContentCard>
      <ContentCard>
        {draftPlayerForms?.length > 0 ?
          <FormTable rows={draftPlayerForms.filter((draftPlayerForm) => draftPlayerForm.playerId.toString() === playerNumber)} />
          : <p> This is not a H2H league so H2H info table cannot be shown</p>}
      </ContentCard>
    </div>

  );
}

export default Player;
