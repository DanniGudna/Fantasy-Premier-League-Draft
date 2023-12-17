/* eslint-disable @typescript-eslint/no-empty-function */
import './App.css';

import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import FantasyPremierLeagueApi from './api/FantasyPremierLeagueApi';
// import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Loading from './Components/Loading/Loading';
import { IAllChartData, IDraftPlayerStanding, IDraftPlayerStats, ILeagueContext, ISeasonStats, ISeasonStatsMap, IStreakMap } from './interfaces/League';
import Charts from './pages/Charts';
import Head2Head from './pages/Head2Head';
import Home from './pages/Home';
import NextVersion from './pages/NextVersion';
import NotFound from './pages/NotFound';
import Stats from './pages/Stats';
import Table from './pages/Table';
import { SEASONS } from './Utils/StaticObjects';
import { createChartData, getAllStreaks, getMatchScores, getPlayerForm, getPlayerStandings } from './Utils/Utils';

const fantasyPremierLeagueApi = new FantasyPremierLeagueApi();

const initialLeagueContext: ILeagueContext = {
  // selectedSeason: {} as ISeasonStats,
  // setSelectedSeason: () => { },
  leagueId: null,
  draftPlayers: [],
  leagueName: '',
  seasonName: '',
  standings: [],
  draftPlayerStats: [],
  matches: [],
  draftPlayerStandings: [],
  streaks: {} as IStreakMap,
  matchScores: [],
  chartData: {} as IAllChartData,
  changeSeason: () => { },
};

export const LeagueContext = React.createContext<ILeagueContext>(initialLeagueContext);

function App() {
  const [seasons, setSeasonsInfo] = useState<ISeasonStatsMap>({} as ISeasonStatsMap);
  const [selectedSeason, setSelectedSeason] = useState<ISeasonStats>({} as ISeasonStats);
  const navigate = useNavigate();

  const changeSeason = (newLeagueId: number) => {
    if (newLeagueId !== selectedSeason.leagueId) {
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
    draftPlayerStats: selectedSeason.draftPlayerStats,
    matches: selectedSeason.matches,
    draftPlayerStandings: selectedSeason.draftPlayerStandings,
    streaks: selectedSeason.streaks,
    matchScores: selectedSeason.matchScores,
    chartData: selectedSeason.chartData,
    changeSeason,
  }), [selectedSeason]);

  const getLeagueInfoForAllSeason = async () => {
    const allSeasonInfos: ISeasonStatsMap = {};

    await Promise.all(SEASONS.map(async (season) => {
      const seasonInfo = {} as ISeasonStats;
      const leagueInfo = await fantasyPremierLeagueApi.getLeagueTableDetails(season.leagueId.toString());
      if (leagueInfo) {
        // figure out the form of each player
        const forms = [] as IDraftPlayerStats[];
        const playerLeagueStandings = [] as IDraftPlayerStanding[];
        leagueInfo.draftPlayers.forEach((player) => forms.push(getPlayerForm(player, leagueInfo.matches || [])));
        forms.forEach((form) => {
          playerLeagueStandings.push(getPlayerStandings(form));
        });
        const streaks = getAllStreaks(forms);
        const matchScores = getMatchScores(forms);
        const chartData = createChartData(playerLeagueStandings);

        // const weekScores = getHighestScoringGameWeeks(leagueInfo.matches); might not be used....

        seasonInfo.matches = leagueInfo.matches; // todo these is maybe not used in the context
        seasonInfo.leagueId = season.leagueId;
        seasonInfo.leagueName = season.leagueName;
        seasonInfo.seasonName = season.seasonName;
        seasonInfo.draftPlayerStats = forms;
        seasonInfo.draftPlayerStandings = playerLeagueStandings;
        seasonInfo.draftPlayers = leagueInfo.draftPlayers;
        seasonInfo.standings = leagueInfo.standings;
        seasonInfo.streaks = streaks;
        seasonInfo.matchScores = matchScores;
        seasonInfo.chartData = chartData;

        allSeasonInfos[seasonInfo.leagueId.toString()] = seasonInfo;
      }
    }));

    // set season info in state
    setSeasonsInfo(allSeasonInfos);
    // set current season as the context season
    setSelectedSeason(allSeasonInfos[
      SEASONS[SEASONS.length - 1].leagueId.toString()
    ]);
  };

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
          <div className="content w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:leagueNumber/stats/:playerId?" element={<Stats />} />
              <Route path="/:leagueNumber/leagueTable/:playerId?" element={<Table />} />
              <Route path="/:leagueNumber/H2H/:playerId?" element={<Head2Head />} />
              <Route path="/:leagueNumber/charts/:playerId?" element={<Charts />} />
              <Route path="/:leagueNumber/draft/:playerId?" element={<NextVersion info="It will show info about the original draft and how well you did in the draft" />} />
              <Route path="/:leagueNumber/transactions/:playerId?" element={<NextVersion info="It will display all of a players transaction and if it was a good transaction or not" />} />
              <Route path="*" element={<NotFound />} />
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
