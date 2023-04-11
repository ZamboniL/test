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

export const loginSchema = yup.object({
  email: yup.string().email().required().label("email"),
  password: yup.string().required().label("senha"),
});
