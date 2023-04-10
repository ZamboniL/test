import { serverInstance } from "src/api";
import { LoginDto } from "../types/LoginDto";

export const postLogin = async (loginDto: LoginDto) =>
  serverInstance
    .post<{ token: string }>("/auth/login", loginDto)
    .then((res) => res.data);
