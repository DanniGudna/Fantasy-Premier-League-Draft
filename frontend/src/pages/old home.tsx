import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ContentCard from '../Components/Common/ContentCard/ContentCard';
import PrimaryButton from '../Components/Common/PrimaryButtons/PrimaryButton';
import TextInput from '../Components/Common/TextInput/TextInput';

function Home(): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  /*   const {
    footballPlayers,
    setFootballPlayers,
  } = useContext(UserContext); */

  const handleLeagueNumberChange = (value: string) => {
    setInputValue(value);
  };

  const navigateToLeage = (league: string) => {
    navigate('/' + league);
  };

  const handleSearchButtonClick = async () => {
    navigateToLeage(inputValue);
  };

  /*   const getFootballPlayerInfo = async () => {
    if (!footballPlayers) {
      const footballPlayersInfo = await fantasyPremierLeagueApi.getFPLPlayerData();
      if (footballPlayersInfo) {
        setFootballPlayers(footballPlayersInfo);
      }
    }
  }; */

  // Handle Enter key press to trigger search
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      handleSearchButtonClick();
    }
  };

  useEffect(() => {
    // getFootballPlayerInfo();
  }, []);

  return (
    <div className="flex items-center justify-center mt-24">
      <ContentCard>
        <div className="px-2 ">
          <h1 className="text-bold font-bold text-lg leading-6 text-text dark:text-darkmode-text">
            Enter your Fantasy Premier League leagueNumber
          </h1>
          <TextInput
            title="League Number"
            inputType="tel"
            placeholder="46795 & 48617"
            helpText="use this number for testing: 46795"
            updateValue={handleLeagueNumberChange}
            textInputValue={inputValue}
            onKeyDown={handleKeyPress} // Add onKeyDown event handler
          />
          <div className="mt-2">
            <PrimaryButton buttonText="Search" handleClick={handleSearchButtonClick} isButtonDisabled={inputValue.length === 0} />
          </div>
        </div>
      </ContentCard>
    </div>

  );
}

export default Home;
