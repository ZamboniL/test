import { instance } from "src/api";
import { CreateUserDto } from "../types/CreateUserDto";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export const postUser = async (createUserDto: CreateUserDto) =>
  instance.post("/users", createUserDto);

export const useCreateUser = () => {
  const router = useRouter();

  const mutation = useMutation<{}, AxiosError<{ type: string }>, CreateUserDto>(
    ["postUser"],
    (createUserDto: CreateUserDto) => postUser(createUserDto),
    { onSuccess: () => router.push("/cadastro/sucesso") }
  );

  return mutation;
};
