import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required().label("email"),
  password: yup.string().required().label("senha"),
});
