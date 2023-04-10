import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useAuthenticatedInstance } from "src/api";

export const getTransactionList = async (instance: AxiosInstance) => {
  return instance.get<Transaction[]>("/transaction").then((res) => res.data);
};

export const useTransactionList = () => {
  const { instance, status } = useAuthenticatedInstance();

  const query = useQuery(
    ["getTransactionList"],
    () => getTransactionList(instance),
    { enabled: status === "authenticated" }
  );

  return query;
};
