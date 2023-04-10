import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosInstance } from "axios";
import { useAuthenticatedInstance } from "src/api";

export const postUploadTransaction = async (
  file: File,
  instance: AxiosInstance
) => {
  const formData = new FormData();
  formData.append("transactions", file);

  return instance
    .post<Transaction[]>("/transaction/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const useUploadTransaction = (
  mutationOptions: UseMutationOptions<
    Transaction[],
    AxiosError<{ type: string }>,
    File
  >
) => {
  const { instance } = useAuthenticatedInstance();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ["postUploadTransaction"],
    (file: File) => postUploadTransaction(file, instance),
    {
      ...mutationOptions,
      onSuccess: (...params) => {
        queryClient.invalidateQueries(["getTransactionList"]);
        mutationOptions.onSuccess?.(...params);
      },
    }
  );

  return mutation;
};
