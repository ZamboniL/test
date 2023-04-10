import * as yup from "yup";

export const uploadSchema = yup.object({
  file: yup
    .mixed<FileList>()
    .test("fileSize", "O arquivo selecionado é muito grande", (value) => {
      if (!value) return true;
      if (!value[0]) return true;

      return value[0].size <= 5000;
    })
    .test("fileType", "O arquivo deve ser do tipo .txt", (value) => {
      if (!value) return true;
      if (!value[0]) return true;

      return value[0].type === "text/plain";
    })
    .test("fileRequired", "O arquivo é obrigatório", (value) => {
      if (!value) return false;
      if (!value[0]) return false;

      return true;
    }),
});
