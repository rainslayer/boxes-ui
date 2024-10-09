import { Flex, useBreakpointValue } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserRewards from "./UserRewards";
import ListOfPlayers from "./ListOfPlayers";
import { StatisticWindowTypes } from "../const/statisticWindowTypes";
import Board from "./Board";
import useCurrentGame from "../hooks/useCurrentGame";
import Api from "../const/api";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../const/routes";
import sseMessages from "../const/sseMessages";
import useOwnedRewards from "../hooks/useOwnedRewards";
import useConnectedUsers from "../hooks/useConnectedUsers";
import ReceivedRewardModal from "./ReceivedRewardModal";
import StatisticLg from "./StatisticLg";
import StatisticBase from "./StatisticBase";

const ROUND_TIME = 2 * 60;

function Game() {
  const breakpoint = useBreakpointValue({
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  const { game, setGame, error } = useCurrentGame();
  const [statisticWindow, setStatisticWindow] = useState(null);
  const [timer, setTimer] = useState(null);
  const [previousReward, setPreviousReward] = useState(null);
  const { rewards, update: updateUserRewards } = useOwnedRewards();
  const { users, setUsers } = useConnectedUsers();
  const timerUpdateInterval = useRef(null);
  const sse = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!game && error) {
      navigate(AppRoutes.SignIn);
    }
  }, [game, error]);

  useEffect(() => {
    if (["lg", "xl"].includes(breakpoint) && !statisticWindow) {
      setStatisticWindow(StatisticWindowTypes.userRewards);
    }
  }, [breakpoint, statisticWindow]);

  useEffect(() => {
    if (game && (!timerUpdateInterval.current || !timer)) {
      updateRoundTimer();
    }
  }, [game, timerUpdateInterval, timer]);

  useEffect(() => {
    reconnectToSse();

    return () => clearSse();
  }, []);

  function reconnectToSse() {
    clearSse();
    sse.current = Api.Sse.getEventSource(); 

    sse.current.onmessage = async (event) => {
      const { data } = event;
      const { message, payload } = JSON.parse(data);

      switch (message) {
        case sseMessages.LootboxOpened:
          setGame((game) => ({
            ...game,
            lootboxes: game?.lootboxes.map((lootbox) => {
              if (lootbox._id === payload._id) {
                return payload;
              }

              return lootbox;
            }),
          }));

          await updateUserRewards();
          break;
        case sseMessages.UserConnected:
          setUsers((users) => {
            if (!users.has(payload)) {
              return new Set([...users, payload]);
            }

            return users;
          });
          break;
        case sseMessages.UserDisconnected:
          setUsers((users) => {
            if (users.has(payload)) {
              const newSet = new Set(users);
              newSet.delete(payload);

              return newSet;
            }

            return users;
          });
          break;
        case sseMessages.NewRound:
          setGame(payload);
          clearRoundTimer();
          break;
      }
    };

    sse.current.onerror = (e) => {
      console.error('SSE error:', e);
      reconnectToSse();
    };
  
    sse.current.onopen = () => {
      console.log('Connected to SSE.');
    };
  }

  function clearSse() {
    if (sse.current) {
      sse.current.close();
      sse.current = null;
    }
  }

  function clearRoundTimer() {
    clearInterval(timerUpdateInterval.current);
    timerUpdateInterval.current = null;
    setTimer(null);
  }

  function updateRoundTimer() {
    clearRoundTimer();

    const newTimer =
      ROUND_TIME -
      Math.ceil(
        (new Date().getTime() - new Date(game.createdAt).getTime()) / 1000
      );

    if (newTimer >= 0) {
      timerUpdateInterval.current = setInterval(() => {
        setTimer((prev) => (prev ? prev - 1 : newTimer));

        if (newTimer <= 0) {
          clearRoundTimer();
        }
      }, 1000);
    }
  }

  const getStatisticWindowComponent = useCallback(() => {
    if (statisticWindow === StatisticWindowTypes.userRewards) {
      return (
        <UserRewards
          rewards={rewards}
          onModalClose={() => setStatisticWindow(null)}
        />
      );
    } else if (statisticWindow === StatisticWindowTypes.listOfPlayers) {
      return (
        <ListOfPlayers
          users={Array.from(users)}
          onModalClose={() => setStatisticWindow(null)}
        />
      );
    }
  }, [statisticWindow, rewards, users]);

  const handleOpenLootbox = useCallback(async (lootboxId) => {
    const res = await Api.Game.openLootbox(lootboxId);
    setPreviousReward(res.data.data);
  }, []);

  if (!game || error) {
    return null;
  }

  return (
    <Flex
      width="100vw"
      maxWidth="100vw"
      height="100vh"
      maxHeight="100vh"
      backgroundColor="black"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        width="100vw"
        height="100vh"
        backgroundColor="#151336aa"
        boxShadow="8px 8px 24px 0px rgba(66, 68, 90, 1)"
        padding={5}
        gap={5}
        flexDirection={{ lg: "row", base: "column" }}
      >
        <StatisticBase
          game={game}
          timer={timer}
          getStatisticWindowComponent={getStatisticWindowComponent}
          setStatisticWindow={setStatisticWindow}
        />
        <StatisticLg
          game={game}
          timer={timer}
          getStatisticWindowComponent={getStatisticWindowComponent}
          setStatisticWindow={setStatisticWindow}
        />
        <Board
          lootboxes={game?.lootboxes}
          handleOpenLootbox={handleOpenLootbox}
        />
        <ReceivedRewardModal
          reward={previousReward}
          onClose={() => setPreviousReward(null)}
        />
      </Flex>
    </Flex>
  );
}

export default Game;
