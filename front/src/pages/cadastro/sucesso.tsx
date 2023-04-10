import Head from "next/head";
import Link from "next/link";
import { Button, Text } from "@chakra-ui/react";
import AuthLayout from "src/features/auth/components/AuthLayout";

export default function RegisterSuccess() {
  return (
    <>
      <Head>
        <title>Cadastro | Sucesso</title>
      </Head>
      <AuthLayout title="Cadastro realizado com sucesso">
        <Text pb="4">Agora você já pode realizar o login!</Text>
        <Button variant="link" as={Link} href="/login">
          Ir para o login.
        </Button>
      </AuthLayout>
    </>
  );
}
