/* eslint-disable @typescript-eslint/no-empty-function */
import './App.css';

import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import FantasyPremierLeagueApi from './api/FantasyPremierLeagueApi';
import ContentCard from './Components/Common/ContentCard/ContentCard';
// import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Loading from './Components/Loading/Loading';
import { LeagueId } from './interfaces/App';
import { IFootballPlayerInfo } from './interfaces/FootballPlayer';
import { ILeagueContext } from './interfaces/Generic';
import { IDraftPlayer, IDraftPlayerForm, IDraftPlayerStanding, ILeagueDetails, IMatch, ISeasonStats, ISeasonStatsMap, IStanding } from './interfaces/League';
import Home from './pages/Home';
import League from './pages/League';
import Player from './pages/Player';
import Table from './pages/Table';
import TODOPAGE from './pages/TODOPAGE';
import { SEASONS } from './Utils/StaticObjects';
import { getPlayerForm, getPlayerStandings } from './Utils/Utils';

const fantasyPremierLeagueApi = new FantasyPremierLeagueApi();

const initialLeagueContext: ILeagueContext = {
  // selectedSeason: {} as ISeasonStats,
  // setSelectedSeason: () => { },
  leagueId: null,
  draftPlayers: [],
  leagueName: '',
  seasonName: '',
  standings: [],
  draftPlayerForms: [],
  matches: [],
  draftPlayerStandings: [],
  changeSeason: () => { },
};

export const LeagueContext = React.createContext<ILeagueContext>(initialLeagueContext);

function App() {
  const [seasons, setSeasonsInfo] = useState<ISeasonStatsMap>({} as ISeasonStatsMap);
  const [selectedSeason, setSelectedSeason] = useState<ISeasonStats>({} as ISeasonStats);
  const navigate = useNavigate();

  // const [leagueDetails, setLeagueDetails] = useState({} as ILeagueDetails);

  /*   const contextValue = useMemo(() => ({
    ...initialUserContext,
    leagueId,
    leagueName,
    draftPlayers,
    standings,
    draftPlayerForms,
    matches,
    draftPlayerStandings,
    footballPlayers,
    setDraftPlayerForms,
    setStandings,
    setLeagueId,
    setLeagueName,
    setDraftPlayers,
    setMatches,
    setDraftPlayerStandings,
    setFootballPlayers,
  }), [leagueId, leagueName, draftPlayers, footballPlayers, standings, draftPlayerForms, matches, draftPlayerStandings]); */

  const changeSeason = (newLeagueId: number) => {
    console.log('🚀 ~ file: App.tsx:70 ~ changeSeason ~ selectedSeason:', selectedSeason);
    if (newLeagueId !== selectedSeason.leagueId) {
      console.log('ding');
      setSelectedSeason(seasons[newLeagueId]);

      // Get the current URL path
      const currentPath = window.location.pathname;

      // Replace the league ID in the path with the new one
      const newPath = currentPath.replace(`/${selectedSeason.leagueId}`, `/${newLeagueId}`);

      // Navigate to the new path
      navigate(newPath);
    }
    // else do nothing
  };

  const contextValue = useMemo(() => ({
    ...initialLeagueContext,
    leagueId: selectedSeason.leagueId,
    draftPlayers: selectedSeason.draftPlayers,
    leagueName: selectedSeason.leagueName,
    seasonName: selectedSeason.seasonName,
    standings: selectedSeason.standings,
    draftPlayerForms: selectedSeason.draftPlayerForms,
    matches: selectedSeason.matches,
    draftPlayerStandings: selectedSeason.draftPlayerStandings,
    changeSeason,
  }), [selectedSeason]);

  const getLeagueInfoForAllSeason = async () => {
    const allSeasonInfos: ISeasonStatsMap = {};

    await Promise.all(SEASONS.map(async (season) => {
      const seasonInfo = {} as ISeasonStats;
      const leagueInfo = await fantasyPremierLeagueApi.getLeagueTableDetails(season.leagueId.toString());
      if (leagueInfo) {
        // figure out the form of each player
        const forms = [] as IDraftPlayerForm[];
        const playerLeagueStandings = [] as IDraftPlayerStanding[];
        leagueInfo.draftPlayers.forEach((player) => forms.push(getPlayerForm(player, leagueInfo.matches || [])));
        forms.forEach((form) => {
          playerLeagueStandings.push(getPlayerStandings(form));
        });

        seasonInfo.matches = leagueInfo.matches; // todo these is maybe not used in the context
        seasonInfo.leagueId = season.leagueId;
        seasonInfo.leagueName = season.leagueName;
        seasonInfo.seasonName = season.seasonName;
        seasonInfo.draftPlayerForms = forms;
        seasonInfo.draftPlayerStandings = playerLeagueStandings;
        seasonInfo.draftPlayers = leagueInfo.draftPlayers;
        seasonInfo.standings = leagueInfo.standings;

        allSeasonInfos[seasonInfo.leagueId.toString()] = seasonInfo;
      }
    }));

    // set season info in state
    setSeasonsInfo(allSeasonInfos);
    // set current season as the context season
    setSelectedSeason(allSeasonInfos[
      SEASONS.find((season) => season.currentSeason)?.leagueId.toString()
      ?? SEASONS[SEASONS.length - 1].leagueId.toString()
    ]);
  };

  // todo changer!

  useEffect(() => {
    console.log('init');
    // calculate all data
    getLeagueInfoForAllSeason();
  }, []);

  return (
    selectedSeason?.leagueId ? (
      <LeagueContext.Provider value={contextValue}>
        <Header />
        <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden pb-16 bg-background dark:bg-darkmode-background min-h-screen">
          <div className="content">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:leagueNumber/stats/:playerId?" element={<League />} />
              <Route path="/:leagueNumber/leagueTable/:playerId?" element={<Table />} />
              <Route path="/:leagueNumber/charts/:playerId?" element={<TODOPAGE />} />
              <Route path="/:leagueNumber/draft/:playerId?" element={<TODOPAGE />} />
              <Route path="/:leagueNumber/transactions/:playerId?" element={<TODOPAGE />} />

              {/* <Route path="/:leagueNumber" element={<League />} />
              <Route path="/:leagueNumber/:playerNumber" element={(<Player />)} />
              <Route path="*" element={<TODOPAGE />} /> */}
            </Routes>
          </div>
          {/* <footer className="flex-shrink-0 w-full">
          <Footer />
        </footer> */}
        </div>
      </LeagueContext.Provider>
    )
      : <Loading />
  );
}

export default App;
