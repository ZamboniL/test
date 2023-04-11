import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { LoginDto } from "../types/LoginDto";
import { loginSchema } from "../validation/loginSchema";

export default function LoginForm() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: LoginDto) => {
    setLoading(true);
    const result = await signIn("credentials-auth", {
      ...data,
      callbackUrl: "/",
      redirect: false,
    });

    if (result?.error) {
      setLoading(false);
      return setError(true);
    }

    router.push("/");
    setLoading(false);
  };

  return (
    <Stack spacing="24px" as="form" onSubmit={handleSubmit(handleLogin)}>
      {error ? (
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
      <Button type="submit" isLoading={loading}>
        Login
      </Button>
      <Button variant="link" as={Link} href="/cadastro">
        Ainda não tem uma conta?
      </Button>
    </Stack>
  );
}
