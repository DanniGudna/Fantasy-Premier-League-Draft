import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LeagueContext } from '../App';

function Home(): ReactElement {
  const { leagueId } = useContext(LeagueContext);

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/' + leagueId + '/leagueTable');
    // getFootballPlayerInfo();
  }, [leagueId]);

  return (
    <div className="flex items-center justify-center mt-24">
      YOU SHOULD NOT SEE THIS. THIS COMPONENT REDIRECTS, TODO WILL CHANGE IN FUTURE
    </div>

  );
}

export default Home;
