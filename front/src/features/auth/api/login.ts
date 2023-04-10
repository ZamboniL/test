import { instance } from "src/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { LoginDto } from "../types/LoginDto";

export const postLogin = async (loginDto: LoginDto) =>
  instance.post("/auth/login", loginDto);

export const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation<{}, AxiosError<{ type: string }>, LoginDto>(
    ["postLogin"],
    (loginDto: LoginDto) => postLogin(loginDto),
    { onSuccess: () => router.push("/") }
  );

  return mutation;
};
