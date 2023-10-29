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
import LeagueTable from '../Components/LeagueTable/LeagueTable';
import Loading from '../Components/Loading/Loading';

function Player(): ReactElement {
  /*   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false); */
  const { playerNumber } = useParams();
  const {
    setLeagueName,
    setPlayers,
    standings,
    setStandings,
    playerForms,
    setPlayerForms,
    matches,
    setMatches,
    setPlayerStandings,
  } = useContext(UserContext);
  console.log('🚀 ~ file: Player.tsx:31 ~ Player ~ matches:', matches);
  console.log('🚀 ~ file: Player.tsx:31 ~ Player ~ playerForms:', playerForms);

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 dark:bg-slate-750">
      <ContentCard>
        {playerForms?.length > 0 ? (
          <LeagueInfoContainer />
        )
          : <p> This is not a H2H league so H2H info table cannot be shown</p>}
      </ContentCard>
      <ContentCard>
        {playerForms?.length > 0 ?
          <FormTable rows={playerForms.filter((playerForm) => playerForm.playerID.toString() === playerNumber)} />
          : <p> This is not a H2H league so H2H info table cannot be shown</p>}
      </ContentCard>
    </div>

  );
}

export default Player;
