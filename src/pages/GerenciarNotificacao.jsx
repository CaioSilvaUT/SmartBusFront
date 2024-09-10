import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const GerenciarNotificacoes = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [texto, setTexto] = useState("");
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  // Função para buscar todas as notificações
  const fetchNotificacoes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/Controllers/getAllNotifi"
      );
      setNotificacoes(response.data);
    } catch (err) {
      setError("Erro ao buscar notificações.");
      console.error(err);
    }
  };

  // Função para obter a data e hora atual no formato 'YYYY-MM-DD HH:MM:SS'
  const getDataHoraAtual = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Função para criar uma nova notificação
  const criarNotificacao = async (e) => {
    e.preventDefault();
    try {
      const formattedDataHora = getDataHoraAtual();

      await axios.post("http://localhost:3000/Controllers/createNotificacao", {
        idUser: userInfo.data.id,
        texto,
        dataHora: formattedDataHora, // Envia a dataHora gerada
        isRead: false,
      });
      setTexto("");
      fetchNotificacoes(); // Atualiza a lista de notificações
    } catch (err) {
      setError("Erro ao criar notificação.");
      console.error(err);
    }
  };

  // Função para excluir uma notificação
  const excluirNotificacao = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/Controllers/deleteNotificacao/${id}`
      );
      fetchNotificacoes(); // Atualiza a lista de notificações
    } catch (err) {
      setError("Erro ao excluir notificação.");
      console.error(err);
    }
  };

  // Carregar notificações ao montar o componente
  useEffect(() => {
    fetchNotificacoes();
  }, []);

  return (
    <div className="bg-green-200 min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-green-300 p-8 rounded-lg border-8 border-green-200">
        <h1 className="text-white text-3xl font-inter font-extrabold mb-6 drop-shadow-sm text-center">
          Gerenciar Notificações
        </h1>

        {/* Formulário para criar notificação */}
        <form onSubmit={criarNotificacao} className="mb-8">
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Texto:</label>
            <input
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-transparent font-bold text-white py-2 px-4 border-2 border-grey rounded-lg hover:bg-green-400 transition duration-300"
          >
            Criar Notificação
          </button>
        </form>

        {/* Exibição das notificações */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {notificacoes.length === 0 ? (
          <p className="text-gray-800 text-center">
            Nenhuma notificação encontrada.
          </p>
        ) : (
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-green-400 text-white">
                <th className="p-4">Texto</th>
                <th className="p-4">Data e Hora</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {notificacoes.map((notif) => (
                <tr key={notif.id}>
                  <td className="p-4">{notif.texto}</td>
                  <td className="p-4">
                    {new Date(notif.dataHora).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => excluirNotificacao(notif.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GerenciarNotificacoes;
