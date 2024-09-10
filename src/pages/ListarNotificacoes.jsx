import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ListarNotificacoes = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  // Função para buscar as notificações do usuário
  const fetchNotificacoes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/Controllers/getAllNotifi"
      );
      setNotificacoes(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
      } else {
        setError("Erro ao buscar Notificações.");
      }
      console.error(err);
    }
  };

  // Carregar notificações ao montar o componente
  useEffect(() => {
    fetchNotificacoes();
  }, [userInfo.data.id]);

  return (
    <div className="bg-green-200 min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-green-300 p-8 rounded-lg border-8 border-green-200">
        <h1 className="text-white text-3xl font-inter font-extrabold mb-6 drop-shadow-sm text-center">
          Minhas Notificações
        </h1>

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
              </tr>
            </thead>
            <tbody>
              {notificacoes.map((notif) => (
                <tr key={notif.id}>
                  <td className="p-4">{notif.texto}</td>
                  <td className="p-4">
                    {new Date(notif.dataHora).toLocaleString()}
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

export default ListarNotificacoes;
