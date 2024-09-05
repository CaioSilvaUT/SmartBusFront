import { Link } from 'react-router-dom';
import historico_icon from "../assets/historico-icon.png";
import terminal_utf from "../assets/terminal-utf.png";
import utf_terminal from "../assets/utf-terminal.png";
import homeBackground from "../assets/home-background.png";

const VerHorarios = () => {
  return (
    <>
    <div
  className="relative flex items-center justify-center min-h-screen bg-green-200"
  style={{
    backgroundImage: `url(${homeBackground})`,
    backgroundSize: "100% auto",
    backgroundPosition: "center", 
    backgroundRepeat: "no-repeat"
  }}
>
  <div className="absolute left-10 top-1/2 transform -translate-y-1/2">
    <div className="flex space-x-4 ml-24">
      <img
        src={utf_terminal}
        alt="UTF Terminal"
        className="h-[32rem] w-auto" 
      />
      <img
        src={terminal_utf}
        alt="Terminal UTF"
        className="h-[32rem] w-auto" 
      />
    </div>
  </div>
  <Link to="#">
    <div className="data-card absolute right-10 mr-20 top-1/2 transform -translate-y-1/2 flex flex-col bg-green-400 border-t-8 border-green-300 overflow-hidden rounded-lg p-8 shadow-lg w-full max-w-xs transition-transform duration-300 transform hover:bg-green-200 hover:scale-105">
      <img
        src={historico_icon}
        alt="Ícone para Visualizar Horários"
        className="h-8 w-10 mb-4"
      />
      <p className="font-semibold text-2xl font-inter text-white border-b-2 border-green-300 mb-2">
        Meu Histórico
      </p>
      <p className="font text-base font-inter text-beige-200 mb-6">
        Se mantenha atualizado sobre suas rotas e seus gastos
      </p>
      <span className="link-text block font-inter text-white italic text-[1.125em] font-semibold leading-tight mt-auto transition-colors duration-300 ease-in-out">
        Clique para acessar
        <svg
          width="25"
          height="16"
          viewBox="0 0 25 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-white inline-block ml-2 transition-transform duration-500 ease-in-out"
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


    </>
  );
};

export default VerHorarios;
