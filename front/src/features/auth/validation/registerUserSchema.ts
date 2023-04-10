import * as yup from "yup";

export const registerUserSchema = yup.object({
  name: yup.string().required().label("nome"),
  email: yup.string().email().required().label("email"),
  password: yup.string().min(6).required().label("senha"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required()
    .label("confirmação de senha"),
});
