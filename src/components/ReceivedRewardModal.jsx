import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  ModalBody,
  ModalFooter,
  Button,
  Stack
} from "@chakra-ui/react";
import getRarityColor from "../helpers/getRarityColor";
import ChestImage from "/chest.png";

function ReceivedRewardModal({ reward, onClose }) {
  return (
    <Modal isOpen={reward !== null} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="#151336">
        <ModalHeader>Your reward</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={ChestImage} />
          <Stack direction="horizontal" justifyContent="center" alignItems="baseline" textAlign="center" alignSelf="end" marginBottom={2} >
            <Text>
              Congratulations! You have found:{" "}
            </Text>
            <Text fontSize={24} color={getRarityColor(reward?.originalReward?.rarity)}>{reward?.originalReward?.name}</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ReceivedRewardModal;
