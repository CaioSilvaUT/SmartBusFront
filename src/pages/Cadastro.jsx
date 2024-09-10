import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cadastroSchema } from "../validation/cadastroSchema";
import { Formik, Field, Form, ErrorMessage } from "formik";

const Cadastro = () => {
  const navigate = useNavigate();
  const [zoomIn, setZoomIn] = useState("scale-95 opacity-0");

  useEffect(() => {
    setZoomIn("scale-100 opacity-100");
  }, []); // Lista de dependências adicionada

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.post("http://localhost:3000/Controllers/newUser", values);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setErrors({
          server: error.response.data.error || "Erro ao enviar a solicitação.",
        });
      } else {
        setErrors({ server: "Erro ao enviar a solicitação." });
      }
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-green-200">
      <div className="shadow-lg bg-green-300 h-screen flex items-center justify-center border-8 border-green-200 rounded-3xl">
        <div
          className={`shadow-lg bg-green-200 p-8 rounded w-full max-w-3xl flex flex-col items-center transition-transform transition-opacity duration-1000 ease-out ${zoomIn}`}
        >
          <div className="bg-green-100 bg-opacity-60 p-8 w-full flex flex-col items-center">
            <h1 className="text-white text-3xl font-inter font-extrabold mb-6 drop-shadow-sm">
              Cadastro
            </h1>
            <Formik
              initialValues={{ nome: "", email: "", telefone: "", senha: "" }}
              validationSchema={cadastroSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 w-2/3 flex-col items-center justify-center">
                  <div>
                    <label
                      htmlFor="nome"
                      className="font-bold font-inter block text-white"
                    >
                      Nome
                    </label>
                    <Field
                      type="text"
                      id="nome"
                      name="nome"
                      className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200"
                    />
                    <ErrorMessage
                      name="nome"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="font-bold font-inter block text-white"
                    >
                      E-mail
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telefone"
                      className="font-bold font-inter block text-white"
                    >
                      Telefone
                    </label>
                    <Field
                      type="tel"
                      id="telefone"
                      name="telefone"
                      className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200"
                    />
                    <ErrorMessage
                      name="telefone"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="senha"
                      className="font-bold font-inter block text-white"
                    >
                      Senha
                    </label>
                    <Field
                      type="password"
                      id="senha"
                      name="senha"
                      className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200"
                    />
                    <ErrorMessage
                      name="senha"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      type="submit"
                      className="bg-transparent font-bold font-inter text-white py-1 px-4 border-2 border-grey rounded-lg hover:bg-green-400 transition duration-300"
                      disabled={isSubmitting}
                    >
                      Confirmar
                    </button>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <p>
                      <label className="text-white font-inter">
                        Já possui uma conta?{" "}
                      </label>
                      <Link
                        to="/login"
                        className="text-white font-semibold font-inter hover:text-green-400"
                      >
                        Fazer login
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
