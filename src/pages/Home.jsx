import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import olho_icon from "../assets/olho-icon.png";
import historico_icon from "../assets/historico-icon.png";
import bg_image from "../assets/home-background.png";

const Home = () => {
  const [resData, setResData] = useState("");
  const [resDataUser, setResDataUser] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/Controllers/getByIdUserCartao/${userInfo.data.id}`,
        {
          params: {
            idUser: userInfo.data.id,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => console.log(err));
  }, [userInfo.data.id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/Controllers/showUserId/${userInfo.data.id}`, {
        params: {
          id: userInfo.data.id,
        },
      })
      .then((res) => {
        console.log(res);
        setResDataUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [userInfo.data.id]);

  return (
    <div className="bg-green-200 flex flex-col items-center h-70 text-white text-lg">
      <div className="flex gap-8 my-16">
        {resData ? (
          <>
            <div className="flex flex-row items-center text-3xl font-inter drop-shadow-lg text-white font-semibold">
              <p>Saldo: R$ {resData.valor}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row items-center text-3xl font-inter drop-shadow-lg text-white font-semibold">
              <p>Saldo: R$ 00,0</p>
            </div>
          </>
        )}
        <div className="flex gap-2">
          <Link
            to="/cartao"
            className="bg-white text-green-200 text-2xl rounded-2xl px-4 py-2 font-semibold font-inter border-2 border-white transition-transform duration-300 transform hover:scale-110 hover:bg-green-200 hover:text-white"
          >
            Meu cartão
          </Link>
        </div>
      </div>
      <div
        className="relative w-full h-[38rem] flex items-center justify-end overflow-hidden"
        style={{
          backgroundImage: `url(${bg_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="absolute left-10 text-beige-100 ml-4 text-6xl font-bold font-inter italic drop-shadow-lg before:content-[''] before:absolute before:left-[-30px] before:top-0 before:bottom-0 before:w-1 before:bg-green-200">
          Olá,
        </h1>
        <h1 className="absolute left-10 text-beige-100 ml-4 mt-28 text-6xl font-bold font-inter italic drop-shadow-lg before:content-[''] before:absolute before:left-[-30px] before:top-0 before:bottom-0 before:w-1 before:bg-green-200">
          {resDataUser.nome}
        </h1>

        <div className="flex gap-4 mr-10">
          <Link to="/verhorarios">
            <div className="data-card flex flex-col bg-white border-t-8 border-green-400 overflow-hidden rounded-lg p-8 mr-4 shadow-lg w-full max-w-72 transition-transform duration-300 transform hover:bg-beige-200 hover:scale-105">
              <img
                src={olho_icon}
                alt="Ícone para Visualizar Horários"
                className="h-8 w-10 mb-4"
              />
              <p className="font-semibold text-2xl font-inter text-green-400 border-b-2 border-green-400 mb-2">
                Horários
              </p>
              <p className="font text-base font-inter text-grey mb-6">
                Se mantenha atualizado sobre os horários e rotas de ônibus
              </p>
              <span className="link-text block font-inter text-green-400 italic text-[1.125em] font-semibold leading-tight mt-auto transition-colors duration-300 ease-in-out">
                Clique para acessar
                <svg
                  width="25"
                  height="16"
                  viewBox="0 0 25 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-green-400 inline-block ml-2 transition-transform duration-500 ease-in-out"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z"
                    fill="green-400"
                  />
                </svg>
              </span>
            </div>
          </Link>
          <Link to="/historico">
            <div className="data-card flex flex-col bg-white border-t-8 border-green-400 overflow-hidden rounded-lg p-8 shadow-lg w-full max-w-72 transition-transform duration-300 transform hover:bg-beige-200 hover:scale-105">
              <img
                src={historico_icon}
                alt="Ícone para Visualizar Horários"
                className="h-8 w-10 mb-4"
              />
              <p className="font-semibold text-2xl font-inter text-green-400 border-b-2 border-green-400 mb-2">
                Meu Histórico
              </p>
              <p className="font text-base font-inter text-grey mb-6">
                Se mantenha atualizado sobre suas rotas e seus gastos
              </p>
              <span className="link-text block font-inter text-green-400 italic text-[1.125em] font-semibold leading-tight mt-auto transition-colors duration-300 ease-in-out">
                Clique para acessar
                <svg
                  width="25"
                  height="16"
                  viewBox="0 0 25 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-green-400 inline-block ml-2 transition-transform duration-500 ease-in-out"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z"
                    fill="green-400"
                  />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
