import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";
import icon_icon from "../assets/icon_icon.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { perfilSchema } from "../validation/perfilSchema";

const Perfil = () => {
  const [resData, setResData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [confirmarDel, setConfirmarDel] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(perfilSchema),
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/Controllers/showUserId/${userInfo.data.id}`, {
        params: {
          id: userInfo.data.id,
        },
      })
      .then((res) => {
        setResData(res.data);
        // Preenche os campos com os dados existentes
        setValue("nome", res.data.nome);
        setValue("email", res.data.email);
        setValue("telefone", res.data.telefone);
      })
      .catch((err) => console.log(err));
  }, [userInfo.data.id, setValue]);

  const handleButton = () => {
    setConfirmarDel(true);
  };

  const handleClose = () => {
    setConfirmarDel(false);
  };

  const handleChanges = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    axios
      .delete(
        `http://localhost:3000/Controllers/deleteUser/${userInfo.data.id}`,
        {
          params: {
            id: userInfo.data.id,
          },
        }
      )
      .then((res) => {
        logoutHandle();
      })
      .catch((err) => {
        console.log("Erro ao excluir conta", err);
      });
  };

  const logoutHandle = async () => {
    try {
      await axios.post("http://localhost:3000/Controllers/logout");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    await axios
      .put(`http://localhost:3000/Controllers/updateUser/${userInfo.data.id}`, {
        params: {
          id: userInfo.data.id,
        },
        ...data,
      })
      .then((res) => {
        setIsEditing(false);
        window.location.reload();
      });
  };

  return (
    <>
      <div className="bg-green-200">
        <div className="bg-green-200 h-screen flex items-center justify-center">
          <div className="bg-beige-100 h-auto flex items-start justify-center border-8 border-green-400 rounded p-8 w-full max-w-5xl shadow-lg">
            <div className="flex flex-col w-3/5 p-8 items-center justify-start border-r-4 border-green-400">
              <img
                src={icon_icon}
                alt="Foto do Perfil"
                className="w-32 h-32 rounded-full mb-2"
              />

              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-8">
                  <div className="w-full mb-4">
                    <label
                      htmlFor="nome"
                      className="block text-green-800 font-inter font-bold mb-2"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      {...register("nome")}
                      className={`w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-green-300 ${
                        errors.nome ? "border-red-500" : ""
                      }`}
                      placeholder="Nome"
                    />
                    {errors.nome && (
                      <p className="text-red-500">{errors.nome.message}</p>
                    )}
                  </div>

                  <div className="w-full mb-4">
                    <label
                      htmlFor="email"
                      className="block text-green-800 font-inter font-bold mb-2"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      {...register("email")}
                      className={`w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-green-300 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="w-full mb-4">
                    <label
                      htmlFor="telefone"
                      className="block text-green-800 font-inter font-bold mb-2"
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      {...register("telefone")}
                      className={`w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-green-300 ${
                        errors.telefone ? "border-red-500" : ""
                      }`}
                      placeholder="Telefone"
                    />
                    {errors.telefone && (
                      <p className="text-red-500">{errors.telefone.message}</p>
                    )}
                  </div>

                  <div className="w-full mb-8">
                    <label
                      htmlFor="senha"
                      className="block text-green-800 font-inter font-bold mb-2"
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      id="senha"
                      name="senha"
                      {...register("senha")}
                      className={`w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 ${
                        errors.senha ? "border-red-500" : ""
                      }`}
                      placeholder="Senha"
                    />
                    {errors.senha && (
                      <p className="text-red-500">{errors.senha.message}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      type="submit"
                      className="bg-trasnparent font-bold font-inter border-2 border-green-400 text-green-400 py-2 px-6 rounded-lg hover:text-white transition duration-300 hover:bg-green-400"
                    >
                      Salvar Alterações
                    </button>
                    <Link
                      to="#"
                      className="bg-trasnparent font-bold font-inter border-2 border-red-500 text-red-500 py-2 px-6 rounded-lg hover:text-white transition duration-300 hover:bg-red-500"
                      onClick={handleButton}
                    >
                      Excluir Conta
                    </Link>
                  </div>
                </form>
              ) : (
                <form className="w-full mb-8">
                  <div className="w-full mb-4">
                    <label
                      htmlFor="nome"
                      className="block text-green-800 font-inter font-bold mb-2"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      className="w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                      value={resData.nome}
                      disabled
                    />
                  </div>

                  <div className="w-full mb-4">
                    <label
                      htmlFor="email"
                      className="block text-green-800 font-inter font-bold mb-2"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                      value={resData.email}
                      disabled
                    />
                  </div>

                  <div className="w-full mb-4">
                    <label
                      htmlFor="telefone"
                      className="block text-green-800 font-inter font-bold mb-2"
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      className="w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                      value={resData.telefone}
                      disabled
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="bg-trasnparent font-bold font-inter border-2 border-green-400 text-green-400 py-2 px-6 rounded-lg hover:text-white transition duration-300 hover:bg-green-400"
                      onClick={handleChanges}
                    >
                      Editar Perfil
                    </button>
                    <Link
                      to="#"
                      className="bg-trasnparent font-bold font-inter border-2 border-red-500 text-red-500 py-2 px-6 rounded-lg hover:text-white transition duration-300 hover:bg-red-500"
                      onClick={handleButton}
                    >
                      Excluir Conta
                    </Link>
                  </div>
                </form>
              )}
            </div>

            {confirmarDel && (
              <div className="bg-white p-6 border-2 border-red-500 rounded-lg shadow-lg w-2/5">
                <h2 className="text-red-500 text-xl font-bold mb-4">
                  Tem certeza que deseja excluir sua conta?
                </h2>
                <div className="flex justify-end">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                    onClick={handleDelete}
                  >
                    Confirmar
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ml-2"
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
