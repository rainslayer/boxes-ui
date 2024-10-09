import { Box, Grid } from '@chakra-ui/react';
import ClosedLootbox from './ClosedLootbox';
import OpenedLootbox from "./OpenedLootbox";  

function Board({ lootboxes, handleOpenLootbox }) {
  const numberOfLootboxes = lootboxes?.length;

  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <Grid
        templateColumns={`repeat(${Math.floor(Math.sqrt(numberOfLootboxes))}, 1fr)`}
        templateRows={`repeat(${Math.floor(Math.sqrt(numberOfLootboxes))}, 1fr)`}
        gap="0px"
        width="100%"
        height="100%"
        border="1px solid white"
      >
        {lootboxes?.map((lootbox) => !lootbox.openedBy ? <ClosedLootbox key={lootbox._id} handleOpenLootbox={() => handleOpenLootbox(lootbox._id)} /> : <OpenedLootbox key={lootbox._id} lootbox={lootbox} />)}
      </Grid>
    </Box>
  );
};

export default Board;
