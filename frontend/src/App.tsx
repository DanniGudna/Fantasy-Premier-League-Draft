/* eslint-disable @typescript-eslint/no-empty-function */
import './App.css';

import React, { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ContentCard from './Components/Common/ContentCard/ContentCard';
// import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { IFootballPlayerInfo } from './interfaces/FootballPlayer';
import { IUserContext } from './interfaces/Generic';
import { IDraftPlayer, IDraftPlayerForm, IDraftPlayerStanding, ILeagueDetails, IMatch, IStanding } from './interfaces/League';
import Home from './pages/Home';
import League from './pages/League';
import Player from './pages/Player';

const initialUserContext: IUserContext = {
  leagueID: '',
  setLeagueID: () => { },
  leagueName: '',
  setLeagueName: () => { },
  draftPlayers: [],
  setDraftPlayers: () => { },
  footballPlayers: [],
  setFootballPlayers: () => { },
  standings: [],
  setStandings: () => { },
  draftPlayerForms: [],
  setDraftPlayerForms: () => { },
  matches: [],
  setMatches: () => { },
  draftPlayerStandings: [],
  setDraftPlayerStandings: () => { },
  leagueDetails: {} as ILeagueDetails,
};

export const UserContext = React.createContext<IUserContext>(initialUserContext);

function App() {
  const [leagueID, setLeagueID] = useState('');
  const [leagueName, setLeagueName] = useState('');
  const [draftPlayers, setDraftPlayers] = useState([] as IDraftPlayer[]);
  const [standings, setStandings] = useState([] as IStanding[]);
  const [draftPlayerForms, setDraftPlayerForms] = useState([] as IDraftPlayerForm[]);
  const [matches, setMatches] = useState([] as IMatch[]);
  const [draftPlayerStandings, setDraftPlayerStandings] = useState([] as IDraftPlayerStanding[]);
  const [footballPlayers, setFootballPlayers] = useState([] as IFootballPlayerInfo[]);

  // const [leagueDetails, setLeagueDetails] = useState({} as ILeagueDetails);

  const contextValue = useMemo(() => ({
    ...initialUserContext,
    leagueID,
    leagueName,
    draftPlayers,
    standings,
    draftPlayerForms,
    matches,
    draftPlayerStandings,
    footballPlayers,
    setDraftPlayerForms,
    setStandings,
    setLeagueID,
    setLeagueName,
    setDraftPlayers,
    setMatches,
    setDraftPlayerStandings,
    setFootballPlayers,
  }), [leagueID, leagueName, draftPlayers, footballPlayers, standings, draftPlayerForms, matches, draftPlayerStandings]);

  return (
    <UserContext.Provider value={contextValue}>
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden pb-16 bg-background dark:bg-darkmode-background min-h-screen">
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
      </div>
    </UserContext.Provider>
  );
}

export default App;
