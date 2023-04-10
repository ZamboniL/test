import { AddIcon } from "@chakra-ui/icons";
import { Button, HStack, Heading } from "@chakra-ui/react";
import UploadModal from "./UploadModal";
import { useState } from "react";

export default function TransactionHeader() {
  const [open, setOpen] = useState(false);

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Heading size="md">Tabela de Transações</Heading>
      <Button
        onClick={() => setOpen(!open)}
        leftIcon={<AddIcon />}
        colorScheme="blue"
        variant="solid"
      >
        Subir transações
      </Button>
      <UploadModal isOpen={open} onClose={() => setOpen(!open)} />
    </HStack>
  );
}
