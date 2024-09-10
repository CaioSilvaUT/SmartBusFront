import { useState } from "react";
import { useSelector } from "react-redux";
import icon_icon from "../assets/icon_icon.png";
import qr_code from "../assets/qr-code.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CriarCartao = () => {
  const [resData, setResData] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [tipo, setTipo] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [depositar, setDepositar] = useState(false);
  const [valor, setValor] = useState("");

  const navigate = useNavigate(); // Hook useNavigate para redirecionamento

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Nenhum arquivo selecionado.");
      return;
    }

    if (!tipo) {
      setError("O tipo de cartão é obrigatório.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tipo", tipo);

    try {
      const response = await axios.post(
        `http://localhost:3000/Controllers/solicitarCartao/${userInfo.data.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        // Define a mensagem de sucesso e limpa os campos
        setMessage(
          response.data.message || "Solicitação de cartão enviada com sucesso!"
        );
        setError("");
        setFile(null);
        setTipo("");

        // Delay de 2 segundos antes de redirecionar
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (err) {
      if (err.response) {
        // Resposta do servidor está disponível
        switch (err.response.status) {
          case 400:
            // Erro do cliente (ex.: solicitação inválida)
            setError(
              err.response.data.error || "Você já possui uma solicitação."
            );
            break;
          case 500:
            // Erro interno do servidor
            setError("Erro ao Salvar . Tente novamente mais tarde.");
            break;
          default:
            // Outros erros
            setError("Ocorreu um erro inesperado. Tente novamente.");
            break;
        }
      } else if (err.request) {
        // Solicitação foi feita, mas sem resposta
        setError(
          "Não foi possível se conectar ao servidor. Verifique sua conexão."
        );
      } else {
        // Algo deu errado ao configurar a solicitação
        setError("Erro ao configurar a solicitação.");
      }

      // Limpa a mensagem de sucesso
      setMessage("");
      console.error(err);
    }
  };

  const handleDeposit = () => {
    window.location.reload();
    setDepositar(false);
  };

  return (
    <>
      <div className="bg-green-200">
        <div className="shadow-lg bg-green-300 h-screen flex items-center justify-center border-8 border-green-200 rounded-3xl relative">
          <div className="bg-green-400 h-auto flex items-start justify-center border-8 border-green-200 rounded p-8 w-full max-w-4xl shadow-lg relative z-10">
            <div className="w-3/5">
              <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg text-center w-56 opacity-10">
                <div className="mb-2">
                  <img
                    src={icon_icon}
                    alt="Foto de Perfil"
                    className="rounded-full w-28 h-28 mb-2"
                  />
                </div>
                <div className="text-2xl font-bold font-inter text-green-400">
                  Usuário
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full opacity-10">
              <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
                <p className="font-bold font-inter text-green-400">Nome:</p>
                <div className="text-gray-800 font-inter text-lg font-medium italic">
                  Usuário
                </div>
              </div>
              <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
                <p className="font-bold font-inter text-green-400">Tipo:</p>
                <div className="text-gray-800 font-inter text-lg font-medium italic">
                  Tipo
                </div>
              </div>
              <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
                <p className="font-bold font-inter text-green-400">Saldo:</p>
                <div className="text-gray-800 font-inter text-lg font-medium italic">
                  R$ 0,00
                </div>
              </div>
              <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
                <p className="font-bold font-inter text-green-400">
                  Data da criação:
                </p>
                <div className="text-gray-800 font-inter text-lg font-medium italic">
                  XX/XX/XX
                </div>
              </div>
              <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
                <p className="font-bold font-inter text-green-400">
                  Data de vencimento:
                </p>
                <div className="text-gray-800 font-inter text-lg font-medium italic">
                  XX/XX/XX
                </div>
              </div>
            </div>

            <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center mt-16">
              <p className="text-white font-semibold font-inter text-4xl drop-shadow-lg">
                Você não possui carteirinha cadastrada.
              </p>
              <p className="text-white mb-8 font-inter text-2xl drop-shadow-lg italic">
                Preencha os dados para criá-la
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <p className="text-white font-normal font-inter text-2xl mb-4 drop-shadow-md">
                  Selecione o tipo da sua carteirinha:
                </p>
                <div className="relative flex justify-center mb-4">
                  <select
                    className="font-inter bg-white text-black py-2 px-4 border-4 border-green-100 rounded-md cursor-pointer text-base transition-colors duration-200 focus:outline-none"
                    onChange={handleTipoChange}
                    required
                  >
                    <option value="" defaultValue hidden>
                      Selecionar Opção
                    </option>
                    <option value="0">Estudante</option>
                    <option value="1">Comum</option>
                    <option value="2">Idoso</option>
                  </select>
                </div>
                <label
                  htmlFor="file"
                  className="text-white font-normal font-inter text-2xl mb-4 drop-shadow-md"
                >
                  Arquivo PDF:
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-64 font-inter bg-white text-black py-2 px-4 border-4 border-green-100 rounded-md mb-6 cursor-pointer text-base transition-colors duration-200 focus:outline-none"
                  required
                />

                <button
                  type="submit"
                  className="bg-white font-bold font-inter text-green-400 py-1 px-4 border-2 border-green-400 rounded-md shadow-lg hover:border-white transition duration-300 hover:text-white transition duration-300 hover:bg-green-400 transition duration-300"
                >
                  Criar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Mensagens de Sucesso e Erro */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30">
        {message && (
          <div className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-500 text-white px-6 py-3 rounded-md shadow-lg mb-4">
            {error}
          </div>
        )}
      </div>

      {depositar && (
        <div className="fixed inset-0 bg-green-100 bg-opacity-60 p-8 flex items-center justify-center overflow-y-auto z-50">
          <div className="bg-white p-8 rounded w-full max-w-lg relative">
            <h2 className="text-2xl font-inter font-semibold text-green-400 mb-4">
              Depositar Dinheiro
            </h2>
            <label
              htmlFor="Valoracolocar"
              className="font-bold font-inter block text-grey flex flex-row mb-3"
            >
              Escolha a forma de pagamento:
            </label>
            <select
              onChange={(e) => {
                setPagamento(e.target.value);
              }}
              className="w-full mb-5 py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-grey focus:outline-none focus:ring-2 focus:ring-green-300"
              id="Valoracolocar"
            >
              <option value="Credito">Cartão de Crédito</option>
              <option value="Debito">Cartão de Débito</option>
              <option value="Pix">Pix</option>
            </select>
            <button
              className="px-8 py-2 bg-green-400 text-white font-semibold font-inter rounded-md shadow-md hover:bg-green-300"
              onClick={handleDeposit}
            >
              Depositar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CriarCartao;
