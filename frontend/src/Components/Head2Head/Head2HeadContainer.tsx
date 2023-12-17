import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LeagueContext } from '../../App';
import { IH2HStats } from '../../interfaces/League';
import { getPlayerById } from '../../Utils/Utils';
import InfoHeader from '../InfoHeader/InfoHeader';
import GenericStatInfo from '../LeagueInfo/GenericStatInfo';
import LeagueInfoCard from '../LeagueInfo/LeagueInfoCard';

const firstCardBorderCss = 'rounded-tl-lg rounded-tr-lg lg:rounded-tr-none';
const secondCardBorderCss = 'lg:rounded-tr-lg';
const fifthCardBorderCss = 'lg:rounded-bl-lg';
const sixthCardBorderCss = 'rounded-bl-lg rounded-br-lg lg:rounded-bl-none';

function H2HContainer(): ReactElement {
  const { playerId } = useParams();
  const [allH2HStats, setAllH2HStats] = useState<IH2HStats[]>([] as IH2HStats[]);

  const { draftPlayerStats, draftPlayers, seasonName, leagueName } = useContext(LeagueContext);

  // TODO combine these functions
  const renderWinRates = (id: string) => {
    const winRates = [] as JSX.Element[];
    const filteredH2HStats = allH2HStats.filter((stat) => stat.playerId.toString() === id);

    filteredH2HStats.forEach((head2HeadStat) => {
      winRates.push(
        <GenericStatInfo
          key={`WinRates-${head2HeadStat.playerId}-${head2HeadStat.opponentId}`}
          text={`${head2HeadStat.playerName} has a ${head2HeadStat.winPercentage}% win rate vs ${getPlayerById(head2HeadStat.opponentId, draftPlayers)?.firstName ?? ''}`}
        />,
      );
    });

    return winRates;
  };

  const renderTotalScores = (id: string) => {
    const totalScores = [] as JSX.Element[];
    const filteredH2HStats = allH2HStats.filter((stat) => stat.playerId.toString() === id);

    filteredH2HStats.forEach((head2HeadStat) => {
      totalScores.push(
        <GenericStatInfo
          key={`TotalScores-${head2HeadStat.playerId}-${head2HeadStat.opponentId}`}
          text={`${head2HeadStat.playerName} ${head2HeadStat.pointsFor} - ${head2HeadStat.pointsAgainst} ${getPlayerById(head2HeadStat.opponentId, draftPlayers)?.firstName ?? ''}`}
        />,
      );
    });

    return totalScores;
  };

  const renderBiggestWins = (id: string) => {
    const totalScores = [] as JSX.Element[];
    const filteredH2HStats = allH2HStats.filter((stat) => stat.playerId.toString() === id);

    filteredH2HStats.forEach((head2HeadStat) => {
      if (head2HeadStat.biggestWin) {
        totalScores.push(
          <GenericStatInfo
            key={`BiggestWin-${head2HeadStat.playerId}-${head2HeadStat.opponentId}`}
            text={`${head2HeadStat.playerName} ${head2HeadStat.biggestWin.playerPoints} - ${head2HeadStat.biggestWin.opponentPoints} ${getPlayerById(head2HeadStat.opponentId, draftPlayers)?.firstName ?? ''} in round ${head2HeadStat.biggestWin.round}`}
          />,
        );
      }
    });

    return totalScores;
  };

  const renderBiggestLoss = (id: string) => {
    const totalScores = [] as JSX.Element[];
    const filteredH2HStats = allH2HStats.filter((stat) => stat.playerId.toString() === id);

    filteredH2HStats.forEach((head2HeadStat) => {
      if (head2HeadStat.biggestLoss) {
        totalScores.push(
          <GenericStatInfo
            key={`BiggestLoss-${head2HeadStat.playerId}-${head2HeadStat.opponentId}`}
            text={`${head2HeadStat.playerName} ${head2HeadStat.biggestLoss.playerPoints} - ${head2HeadStat.biggestLoss.opponentPoints} ${getPlayerById(head2HeadStat.opponentId, draftPlayers)?.firstName ?? ''} in round ${head2HeadStat.biggestLoss.round}`}
          />,
        );
      }
    });

    return totalScores;
  };

  useEffect(() => {
    const head2HeadStats: IH2HStats[] = [];
    draftPlayerStats.forEach((draftPlayerStat) => {
      draftPlayerStat.head2HeadStats.forEach((head2HeadStat) => {
        head2HeadStats.push(head2HeadStat);
      });
    });
    setAllH2HStats(head2HeadStats);
  }, []);

  return (
    <div>
      <InfoHeader
        title={playerId ?
          `Head 2 Head stats for 
          ${getPlayerById(parseInt(playerId, 10), draftPlayers)?.firstName} - 
          ${getPlayerById(parseInt(playerId, 10), draftPlayers)?.teamName}`
          : leagueName}
        subTitle={`In ${seasonName} - NOTE version three will contain recent H2H form as well`}
      />
      <div className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow lg:grid lg:grid-cols-2 lg:gap-px lg:divide-y-0">
        <LeagueInfoCard statTitle="Win rate vs other players" borderCss={firstCardBorderCss}>
          {draftPlayerStats.map((draftPlayer) => {
            const playerIdToRender = playerId ? parseInt(playerId, 10) : null;

            // Conditionally render based on playerId
            if (!playerId || draftPlayer.playerId === playerIdToRender) {
              return (
                <div className="p-2 grid grid-cols-1 border-b h-24" key={draftPlayer.playerId}>
                  {renderWinRates(draftPlayer.playerId.toString())}
                </div>
              );
            }

            return null; // If playerId is provided and the current player does not match, return null
          })}
        </LeagueInfoCard>
        <LeagueInfoCard statTitle="Total scores between players" borderCss={secondCardBorderCss}>
          {draftPlayerStats.map((draftPlayer) => {
            const playerIdToRender = playerId ? parseInt(playerId, 10) : null;

            // Conditionally render based on playerId
            if (!playerId || draftPlayer.playerId === playerIdToRender) {
              return (
                <div className="p-2 grid grid-cols-1 border-b h-24" key={draftPlayer.playerId}>
                  {renderTotalScores(draftPlayer.playerId.toString())}
                </div>
              );
            }

            return null; // If playerId is provided and the current player does not match, return null
          })}
        </LeagueInfoCard>
        <LeagueInfoCard statTitle="Biggest wins" borderCss={fifthCardBorderCss}>
          {draftPlayerStats.map((draftPlayer) => {
            const playerIdToRender = playerId ? parseInt(playerId, 10) : null;

            // Conditionally render based on playerId
            if (!playerId || draftPlayer.playerId === playerIdToRender) {
              return (
                <div className="p-2 grid grid-cols-1 border-b h-24" key={draftPlayer.playerId}>
                  {renderBiggestWins(draftPlayer.playerId.toString())}
                </div>
              );
            }

            return null; // If playerId is provided and the current player does not match, return null
          })}
        </LeagueInfoCard>
        <LeagueInfoCard statTitle="Biggest losses" borderCss={sixthCardBorderCss}>
          {draftPlayerStats.map((draftPlayer) => {
            const playerIdToRender = playerId ? parseInt(playerId, 10) : null;

            // Conditionally render based on playerId
            if (!playerId || draftPlayer.playerId === playerIdToRender) {
              return (
                <div className="p-2 grid grid-cols-1 border-b h-24" key={draftPlayer.playerId}>
                  {renderBiggestLoss(draftPlayer.playerId.toString())}
                </div>
              );
            }

            return null; // If playerId is provided and the current player does not match, return null
          })}
        </LeagueInfoCard>
      </div>

    </div>

  );
}

export default H2HContainer;
