import * as Yup from "yup";

export const perfilSchema = Yup.object({
  nome: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "O nome deve conter apenas letras e espaços.")
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(50, "O nome deve ter no máximo 50 caracteres.")
    .required("Nome é obrigatório."),
  email: Yup.string().email("Email inválido.").required("Email é obrigatório."),
  telefone: Yup.string()
    .matches(/^\d+$/, "O telefone deve conter apenas números.")
    .min(10, "O telefone deve ter pelo menos 10 dígitos.")
    .max(15, "O telefone deve ter no máximo 15 dígitos.")
    .required("Telefone é obrigatório."),
  senha: Yup.string()
    .min(3, "A senha deve ter pelo menos 3 caracteres.")
    .required("Senha é obrigatória."),
});
