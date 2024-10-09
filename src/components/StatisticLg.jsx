import { Flex, Stack, Text } from "@chakra-ui/react";
import { PiTreasureChestBold, PiUsersFour } from "react-icons/pi";
import StatisticNavigationButton from "./StatisticNavigationButton";
import { StatisticWindowTypes } from "../const/statisticWindowTypes";

function StatisticLg({
  game,
  timer,
  getStatisticWindowComponent,
  setStatisticWindow,
}) {
  return (
    <Flex
      height="100%"
      width="25%"
      gap={5}
      flexDirection="column"
      hideBelow="lg"
    >
      <Stack
        direction="horizontal"
        alignItems="center"
        justifyContent="space-between"
        border="1px solid white"
        padding={2}
        fontSize={24}
        fontStyle="italic"
      >
        <Text>Round #{game?.round}</Text>
        <Stack
          width="fit-content"
          padding={2}
          direction="horizontal"
          border="1px solid white"
        >
          <StatisticNavigationButton
            onClick={() => setStatisticWindow(StatisticWindowTypes.userRewards)}
          >
            <PiTreasureChestBold />
          </StatisticNavigationButton>
          <StatisticNavigationButton
            onClick={() =>
              setStatisticWindow(StatisticWindowTypes.listOfPlayers)
            }
          >
            <PiUsersFour />
          </StatisticNavigationButton>
        </Stack>
        {timer && (
          <Text color={timer <= 10 ? "red" : "white"}>
            {Math.floor(timer / 60)
              .toString()
              .padStart(2, 0)}
            :
            {Math.floor(timer % 60)
              .toString()
              .padStart(2, 0)}
          </Text>
        )}
      </Stack>
      {getStatisticWindowComponent()}
    </Flex>
  );
}

export default StatisticLg;
