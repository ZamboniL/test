import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { uploadSchema } from "../validation/uploadSchema";
import { useUploadTransaction } from "../api/uploadTransaction";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ file: FileList }>({
    resolver: yupResolver(uploadSchema),
  });

  const uploadTransaction = useUploadTransaction({
    onSuccess: () => onClose(),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleSubmit((data) =>
          uploadTransaction.mutate(data.file[0])
        )}
      >
        <ModalHeader>Subir Transações</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {uploadTransaction.error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>
                {uploadTransaction.error.response?.data?.type ===
                "foreign-key-violation"
                  ? "O arquivo enviado contém um tipo de transação inválido."
                  : "Ocorreu um erro ao subir o arquivo."}
              </AlertDescription>
            </Alert>
          ) : null}
          <FormControl isInvalid={Boolean(errors.file)}>
            <FormLabel>Selecione o arquivo</FormLabel>
            <Input type="file" p={4} height="unset" {...register("file")} />
            <FormErrorMessage>{errors.file?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={uploadTransaction.isLoading}
          >
            Subir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
