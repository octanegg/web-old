import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/core";
import { useState } from "react";
import { resetGameOld } from "../../providers/api";

export const ResetGameModal = ({ selectedMatch, isOpen, onClose }) => {
  const [selectedGame, setSelectedGame] = useState();

  const resetGame = async () => {
    resetGameOld(selectedMatch, selectedGame);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Delete a game from {selectedMatch}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Game Number</FormLabel>
              <Input
                value={selectedGame || ""}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setSelectedGame(value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Stack direction={["column", "row"]}>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={resetGame}
                isDisabled={selectedGame == ""}
              >
                Reset
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
