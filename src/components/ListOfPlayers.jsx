import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Virtuoso } from "react-virtuoso";

function ListOfPlayers({ users, onModalClose }) {
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
          List of players
        </Text>
        <Flex
          flexDirection="column"
          gap={1}
          padding={2}
          height="100%"
          textAlign="center"
        >
          <Virtuoso
            data={users}
            itemContent={(_, user) => <Text key={user}>{user}</Text>}
          />
        </Flex>
      </Box>
    );
  } else if (["sm", "md"].includes(breakpoint)) {
    return (
      <Modal isOpen={modalOpened} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="#151336">
          <ModalHeader>List of players</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap={1} padding={2} textAlign="center">
              <Virtuoso
                style={{ height: "50rem" }}
                data={users}
                itemContent={(_, user) => <Text key={user}>{user}</Text>}
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
}

export default ListOfPlayers;
