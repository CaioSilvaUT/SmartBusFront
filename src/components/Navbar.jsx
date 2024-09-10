import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../auth/usersApiSlice";
import { logout } from "../auth/authSlice";
import { useState } from "react";
import { useEffect } from "react";
import bus_stop from "../assets/bus-stop.png";
import axios from "axios";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [resData, setResData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const handleMessage = () => {
    axios
      .get(`http://localhost:3000/Controllers/showUserId/${userInfo.data.id}`, {
        params: {
          id: userInfo.data.id,
        },
      })
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const logoutHandle = async () => {
    try {
      await axios.post("http://localhost:3000/Controllers/logout");
      dispatch(logout());
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
    handleMessage();
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-green-400 to-green-200 p-4 h-16">
        <div className="font-inter container mx-auto flex justify-between items-center h-full">
          <div className="flex items-center">
            {userInfo ? (
              <>
                <img
                  src={bus_stop}
                  alt="Ícone para Visualizar Horários"
                  className="h-8 w-8 mr-2"
                />
                <NavLink
                  to="/home"
                  className="text-white text-xl italic font-bold"
                >
                  SmartBus
                </NavLink>
              </>
            ) : (
              <>
                <img
                  src={bus_stop}
                  alt="Ícone para Visualizar Horários"
                  className="h-8 w-8 mr-2"
                />
                <NavLink to="/" className="text-white text-xl italic font-bold">
                  SmartBus
                </NavLink>
              </>
            )}
          </div>
          <div className="space-x-4">
            {userInfo ? (
              <>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-green-400 rounded p-2 shadow-md"
                      : "text-white font-semibold hover:text-green-300 p-2"
                  }
                >
                  Home
                </NavLink>
                <span className="border-l border-white h-6"></span>
                <NavLink
                  to="/VerHorarios"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-green-400 rounded p-2 shadow-md"
                      : "text-white font-semibold hover:text-green-300 p-2"
                  }
                >
                  Horários
                </NavLink>
                <NavLink
                  to="/cartao"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-green-400 rounded p-2 shadow-md"
                      : "text-white font-semibold hover:text-green-300 p-2"
                  }
                >
                  Cartão
                </NavLink>
                <NavLink
                  to="/historico"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-green-400 rounded p-2 shadow-md"
                      : "text-white font-semibold hover:text-green-300 p-2"
                  }
                >
                  Histórico
                </NavLink>
                <NavLink
                  to="/avisos"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-green-400 rounded p-2 shadow-md"
                      : "text-white font-semibold hover:text-green-300 p-2"
                  }
                >
                  Avisos
                </NavLink>

                {userInfo.data.is_adm && (
                  <>
                    <span className="border-l border-white h-6"></span>
                    <NavLink
                      to="/gerenciarnotificacao"
                      className={({ isActive }) =>
                        isActive
                          ? "text-white font-semibold bg-green-400 rounded p-2 shadow-md"
                          : "text-white font-semibold hover:text-green-300 p-2"
                      }
                    >
                      Gerenciar Notificação
                    </NavLink>
                    <NavLink
                      to="/gerenciarsolicitacao"
                      className={({ isActive }) =>
                        isActive
                          ? "text-white font-semibold bg-green-400 rounded p-2 shadow-md"
                          : "text-white font-semibold hover:text-green-300 p-2"
                      }
                    >
                      Gerenciar Solicitação
                    </NavLink>
                  </>
                )}

                <span className="border-l border-white h-6"></span>

                <div className="relative inline-block">
                  <NavLink
                    to="#"
                    onMouseEnter={handleDropdown}
                    className="text-white font-semibold hover:text-green-300 focus:outline-none px-2"
                  >
                    Conta
                    <svg
                      className="inline-block w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </NavLink>

                  {dropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <div className="border-b-2 border-green-300 px-4 py-3 text-black">
                        <div>Olá, {resData.nome}</div>
                        <div className="font-medium truncate">
                          {resData.email}
                        </div>
                      </div>
                      <NavLink
                        to="/perfil"
                        className="block px-4 py-2 text-black hover:bg-gray-200"
                      >
                        Perfil
                      </NavLink>
                      <button
                        onClick={logoutHandle}
                        className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-green-400 rounded p-2 shadow-md"
                      : "text-white font-semibold hover:text-green-300 p-2"
                  }
                >
                  Home
                </NavLink>
                <span className="border-l border-white h-6"></span>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-green-400 rounded p-2 shadow-md"
                      : "text-white font-semibold hover:text-green-300 p-2"
                  }
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
