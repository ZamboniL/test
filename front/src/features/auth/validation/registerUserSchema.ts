import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Campo ${path} é obrigatório",
  },
  string: {
    email: "Email inválido",
    min: "Mínimo de ${min} caracteres",
  },
});

export const registerUserSchema = yup.object({
  name: yup.string().required().label("nome"),
  email: yup.string().email().required().label("email"),
  password: yup.string().min(6).required().label("senha"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Senhas não conferem")
    .required()
    .label("confirmação de senha"),
});
