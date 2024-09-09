import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const GerenciarNotificacao = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const response = await axios.get(
          `/getNotificacaoByUserId/${userInfo.data.id}`
        );

        // Verificar se a resposta é um array
        if (Array.isArray(response.data)) {
          setNotificacoes(response.data);
        } else {
          // Ajuste conforme necessário se a resposta for um objeto
          console.error("Resposta inesperada da API:", response.data);
          setError("");
        }
      } catch (err) {
        console.error("Erro ao buscar notificações:", err);
        setError("Erro ao buscar notificações.");
      }
    };

    fetchNotificacoes();
  }, [userInfo.data.id]);

  return (
    <div className="bg-green-200 min-h-screen flex items-center justify-center">
      <div className="shadow-lg bg-green-300 w-full max-w-4xl p-8 rounded-lg border-8 border-green-200">
        <h1 className="text-white text-3xl font-inter font-extrabold mb-6 drop-shadow-sm text-center">
          Gerenciar Notificações
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="bg-green-100 bg-opacity-60 p-6 rounded-lg">
          {notificacoes.length === 0 ? (
            <p className="text-gray-800 text-center">
              Nenhuma notificação encontrada.
            </p>
          ) : (
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-green-400 text-white">
                  <th className="p-4">ID</th>
                  <th className="p-4">Mensagem</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(notificacoes) &&
                  notificacoes.map((notif) => (
                    <tr key={notif.id}>
                      <td className="p-4">{notif.id}</td>
                      <td className="p-4">{notif.mensagem}</td>
                      <td className="p-4">{notif.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default GerenciarNotificacao;
