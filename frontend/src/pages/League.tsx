/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FantasyPremierLeagueApi } from '../api';
import { UserContext } from '../App';
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
  const { leagueNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getLeagueInfo = async () => {
    if (leagueNumber) {
      setLoading(true);
      const leagueInfo = await fantasyPremierLeagueApi.getLeagueTableDetails(leagueNumber);
      const FPLPlayerInfo = await fantasyPremierLeagueApi.getFPLPlayerData();
      console.log('🚀 ~ file: League.tsx:42 ~ getLeagueInfo ~ FPLPlayerInfo:', FPLPlayerInfo);
      if (leagueInfo && leagueInfo.standings) {
        const { league_entries, league } = leagueInfo;
        setLeagueName(league.name);
        const playersInLeague = [] as IDraftPlayer[];
        // get all the players in the league
        league_entries.forEach((player) => {
          playersInLeague.push(player as IDraftPlayer);
        });
        setDraftPlayers(playersInLeague);

        // matches are only in H2H leagues
        if (leagueInfo.matches) {
          const forms = [] as IDraftPlayerForm[];
          // figure out the form of each player
          playersInLeague.forEach((player) => forms.push(getPlayerForm(player, leagueInfo.matches || [])));
          setDraftPlayerForms(forms);
          setMatches(leagueInfo.matches);

          const playerLeagueStandings = [] as IDraftPlayerStanding[];

          forms.forEach((form) => {
            playerLeagueStandings.push(getPlayerStandings(form));
          });
          setDraftPlayerStandings(playerLeagueStandings);
        }
        // add the points diff to the standings object,used for sorting
        leagueInfo.standings.forEach((standing) => {
          standing.points_diff = standing.points_for - standing.points_against;
        });
        setStandings(leagueInfo.standings);
        setLoading(false);
        setError(false);
        // history.push(`/${inputValue}/`);
      }
      else {
        setError(true);
      }
    }
  };

  useEffect(() => {
    getLeagueInfo();
  }, []);

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 dark:bg-slate-750">
      {loading ?
        error ? (
          <div className="2xl:col-span-2 flex justify-center items-center">
            <ContentCard>
              <p className="text-black dark:text-white">Failed to get league with this ID, are you sure it is a draft h2h league?</p>
            </ContentCard>
          </div>
        ) : <Loading />

        : (
          <>
            <ContentCard>
              <LeagueTable rows={standings} />
            </ContentCard>
            <ContentCard>
              {draftPlayerForms?.length > 0 ?
                <FormTable rows={draftPlayerForms} /> : <p> This is not a H2H league so H2H info table cannot be shown</p>}
            </ContentCard>
            <ContentCard>
              {draftPlayerForms?.length > 0 ? <LeagueInfoContainer />
                : <p> This is not a H2H league so H2H info table cannot be shown</p>}
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
