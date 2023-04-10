import {
  Badge,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useTransactionList } from "../api/transactionList";

const convertToBRL = (value: string) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parseInt(value));
};

const convertToDate = (value: string) => {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
};

export default function TransactionTable() {
  const transactionList = useTransactionList();

  if (transactionList.isLoading || transactionList.isPaused) {
    return (
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Vendedor</Th>
              <Th>Tipo</Th>
              <Th>Produto</Th>
              <Th>Data</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Carregando...</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  if (transactionList.isError) {
    return (
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Vendedor</Th>
              <Th>Tipo</Th>
              <Th>Produto</Th>
              <Th>Data</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Ocorreu um erro ao carregar os dados</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Vendedor</Th>
            <Th>Tipo</Th>
            <Th>Produto</Th>
            <Th>Data</Th>
            <Th>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactionList.data.map((item) => {
            const isNegative = item.type.id === 3;

            return (
              <Tr key={item.id}>
                <Td>
                  <Text casing="capitalize">{item.seller.toLowerCase()}</Text>
                </Td>
                <Td>
                  <Badge colorScheme={isNegative ? "red" : "green"}>
                    {item.type.description}
                  </Badge>
                </Td>
                <Td>{item.product}</Td>
                <Td>{convertToDate(item.date)}</Td>
                <Td>
                  <Text color={isNegative ? "red.600" : "green.600"}>
                    {isNegative ? "- " : "+ "}
                    {convertToBRL(item.price)}
                  </Text>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
