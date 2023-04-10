import Head from "next/head";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
} from "@chakra-ui/react";
import RegisterUserForm from "src/features/auth/components/RegisterUserForm";
import AuthLayout from "src/features/auth/components/AuthLayout";

export default function Register() {
  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
      <AuthLayout title="Cadastro">
        <RegisterUserForm />
      </AuthLayout>
    </>
  );
}
