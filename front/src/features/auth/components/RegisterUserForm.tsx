import Link from "next/link";
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
import { registerUserSchema } from "../validation/registerUserSchema";
import { CreateUserDto } from "../types/CreateUserDto";
import { useCreateUser } from "../api/createUser";

export default function RegisterUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: yupResolver(registerUserSchema),
  });

  const createUser = useCreateUser();

  return (
    <Stack
      spacing="24px"
      as="form"
      onSubmit={handleSubmit((data) => createUser.mutate(data))}
    >
      {createUser.isError ? (
        <Alert status="error">
          <AlertIcon />{" "}
          <AlertDescription>
            {createUser.error?.response?.data?.type === "unique-violation"
              ? "Email já cadastrado"
              : "Erro ao cadastrar usuário"}
          </AlertDescription>
        </Alert>
      ) : null}
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel>Nome</FormLabel>
        <Input placeholder="João Gomes" {...register("name")} />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>
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
          autoComplete="new-password"
          {...register("password")}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.passwordConfirmation)}>
        <FormLabel>Confirmar senha</FormLabel>
        <Input
          type="password"
          placeholder="********"
          autoComplete="new-password"
          {...register("passwordConfirmation")}
        />
        <FormErrorMessage>
          {errors.passwordConfirmation?.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={createUser.isLoading}>
        Cadastrar
      </Button>
      <Button variant="link" as={Link} href="/login">
        Já tem uma conta?
      </Button>
    </Stack>
  );
}
