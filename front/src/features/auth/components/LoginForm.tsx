import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginDto } from "../types/LoginDto";
import { useLogin } from "../api/login";
import { loginSchema } from "../validation/loginSchema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });
  const login = useLogin();

  return (
    <Stack
      spacing="24px"
      as="form"
      onSubmit={handleSubmit((data) => login.mutate(data))}
    >
      {login.isError ? (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>Credenciais inválidas.</AlertDescription>
        </Alert>
      ) : null}
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="joao@gmail.com"
          {...register("email")}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel>Senha</FormLabel>
        <Input
          type="password"
          placeholder="********"
          autoComplete="password"
          {...register("password")}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={login.isLoading}>
        Login
      </Button>
      <Button variant="link" as={Link} href="/cadastro">
        Ainda não tem uma conta?
      </Button>
    </Stack>
  );
}
