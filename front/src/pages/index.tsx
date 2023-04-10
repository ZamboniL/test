import Head from "next/head";
import { Box, Card, CardBody, CardHeader, Container } from "@chakra-ui/react";
import TransactionHeader from "src/features/transaction/components/TransactionHeader";
import TransactionTable from "src/features/transaction/components/TransactionTable";

export default function Home() {
  return (
    <>
      <Head>
        <title>Afiliados</title>
      </Head>
      <Box as="main" flex={1} width="100%" bg="gray.100" py={4}>
        <Container maxW="container.xl">
          <Card>
            <CardBody>
              <CardHeader>
                <TransactionHeader />
              </CardHeader>
              <TransactionTable />
            </CardBody>
          </Card>
        </Container>
      </Box>
    </>
  );
}
