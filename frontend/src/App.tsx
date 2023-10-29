/* eslint-disable @typescript-eslint/no-empty-function */
import './App.css';

import React, { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ContentCard from './Components/Common/ContentCard/ContentCard';
// import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { IUserContext } from './interfaces/Generic';
import { ILeagueDetails, IMatch, IPlayer, IPlayerForm, IPlayerStanding, IStanding } from './interfaces/League';
import Home from './pages/Home';
import League from './pages/League';
import Player from './pages/Player';

const initialUserContext: IUserContext = {
  leagueID: '',
  setLeagueID: () => { },
  leagueName: '',
  setLeagueName: () => { },
  players: [],
  setPlayers: () => { },
  standings: [],
  setStandings: () => { },
  playerForms: [],
  setPlayerForms: () => { },
  matches: [],
  setMatches: () => { },
  playerStandings: [],
  setPlayerStandings: () => { },
  leagueDetails: {} as ILeagueDetails,
};

export const UserContext = React.createContext<IUserContext>(initialUserContext);

function App() {
  const [leagueID, setLeagueID] = useState('');
  const [leagueName, setLeagueName] = useState('');
  const [players, setPlayers] = useState([] as IPlayer[]);
  const [standings, setStandings] = useState([] as IStanding[]);
  const [playerForms, setPlayerForms] = useState([] as IPlayerForm[]);
  const [matches, setMatches] = useState([] as IMatch[]);
  const [playerStandings, setPlayerStandings] = useState([] as IPlayerStanding[]);
  // const [leagueDetails, setLeagueDetails] = useState({} as ILeagueDetails);

  const contextValue = useMemo(() => ({
    ...initialUserContext,
    leagueID,
    leagueName,
    players,
    standings,
    playerForms,
    matches,
    playerStandings,
    setPlayerForms,
    setStandings,
    setLeagueID,
    setLeagueName,
    setPlayers,
    setMatches,
    setPlayerStandings,
  }), [leagueID, leagueName, players, standings, playerForms, matches, playerStandings]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden pb-16 dark:bg-slate-600 min-h-screen">
      <UserContext.Provider value={contextValue}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:leagueNumber" element={<League />} />
            <Route path="/:leagueNumber/:playerNumber" element={(<Player />)} />
          </Routes>
        </div>
        {/* <footer className="flex-shrink-0 w-full">
          <Footer />
        </footer> */}
      </UserContext.Provider>
    </div>
  );
}

export default App;
