import axios from "axios";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const serverInstance = axios.create({
  baseURL: process.env.API_SERVER_URL,
});

export const generateAuthenticatedInstance = (token: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useAuthenticatedInstance = () => {
  const { status, data } = useSession();

  if (!data?.token) {
    return useMemo(
      () => ({
        instance,
        status,
      }),
      [data?.token, status]
    );
  }

  return useMemo(
    () => ({
      instance: generateAuthenticatedInstance(data.token),
      status,
    }),
    [data?.token, status]
  );
};
