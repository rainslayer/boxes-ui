import { Box } from "@chakra-ui/react";
import SecretImage from "/secret.webp";

function ClosedLootbox({ handleOpenLootbox }) {
  return (
    <Box
      border="1px solid white"
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundImage={SecretImage}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      cursor="pointer"
      _hover={{ backgroundColor: "black", opacity: 0.5, transition: "0.5s" }}
      onClick={handleOpenLootbox}
    />
  );
}

export default ClosedLootbox;
