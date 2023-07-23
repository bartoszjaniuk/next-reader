import * as Yup from "yup";
export const validationSchema = Yup.object({
  email: Yup.string()
    .max(30, "Maksymalna ilość znaków wynosi 30")
    .email("Nieprawidłowy adres email")
    .required("Pole jest wymagane"),
  password: Yup.string().required("Pole jest wymagane"),
  confirmPassword: Yup.string()
    .required("Pole jest wymagane")
    .oneOf([Yup.ref("password"), ""], "Hasła róznia się"),
});
