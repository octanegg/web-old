import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'

const DeleteModal = ({ isOpen, onClose, onSubmit, header, body }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{body}</ModalBody>
          <ModalFooter>
            <Stack direction={['column', 'row']}>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={() => {
                  onSubmit()
                  onClose()
                }}>
                Delete
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default DeleteModal
