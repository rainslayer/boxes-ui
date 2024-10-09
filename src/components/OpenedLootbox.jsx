import { Box, Text, Stack } from "@chakra-ui/react";
import ChestImage from "/chest.png";
import getRarityColor from "../helpers/getRarityColor";

function OpenedLootbox({ lootbox }) {
  return (
    <Box
      border="1px solid white"
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundImage={ChestImage}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
    >
      <Stack alignSelf="end" marginBottom={2} direction="horizontal">
        <Text>{lootbox?.openedBy?.login} found:</Text>
        <Text color={getRarityColor(lootbox?.reward?.originalReward?.rarity)}>
          {lootbox?.reward?.originalReward?.name}
        </Text>
      </Stack>
    </Box>
  );
}

export default OpenedLootbox;
