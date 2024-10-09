import {
  Box,
  Flex,
  Text,
  useBreakpointValue, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from "@chakra-ui/react";
import getRarityColor from "../helpers/getRarityColor";
import { useMemo } from "react";
import { Virtuoso } from "react-virtuoso";

function UserRewards({ rewards, onModalClose }) {
  const breakpoint = useBreakpointValue({
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

  const modalOpened = useMemo(
    () => ["sm", "md"].includes(breakpoint),
    [breakpoint]
  );

  if (["lg", "xl"].includes(breakpoint)) {
    return (
      <Box border="1px solid white" height="100%" padding={2}>
        <Text fontSize={20} textAlign="center" borderBottom="1px solid white">
          List of user rewards
        </Text>
        <Flex
          flexDirection="column"
          gap={1}
          padding={2}
          textAlign="center"
          height="98%"
        >
          <Virtuoso
            data={rewards}
            itemContent={(_, reward) => (
              <Box
                key={reward?._id}
                border="1px solid white"
                color={getRarityColor(reward?.originalReward?.rarity)}
              >
                {reward?.originalReward?.name}
              </Box>
            )}
          />
        </Flex>
      </Box>
    );
  } else if (["sm", "md"].includes(breakpoint)) {
    return (
      <Modal isOpen={modalOpened} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="#151336">
          <ModalHeader>Your rewards</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap={1} padding={2} textAlign="center">
              <Virtuoso
                data={rewards}
                style={{ height: "50rem" }}
                itemContent={(_, reward) => (
                  <Box
                    key={reward?._id}
                    border="1px solid white"
                    color={getRarityColor(reward?.originalReward?.rarity)}
                  >
                    {reward?.originalReward?.name}
                  </Box>
                )}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
};

export default UserRewards;
