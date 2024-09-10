import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useAdminRedirect from "../components/useAdminRedirect";

const GerenciarSolicitacao = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  useAdminRedirect();
  // Função para buscar as solicitações pendentes
  const fetchSolicitacoesPendentes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/Controllers/solicitacoesPendentes"
      );
      setSolicitacoes(response.data);
    } catch (err) {
      setError("Erro ao buscar solicitações.");
      console.error(err);
    }
  };

  // Função para processar a solicitação (aceitar ou recusar)
  const processarSolicitacao = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3000/Controllers/processarSolicitacao/${id}`,
        {
          status,
        }
      );
      fetchSolicitacoesPendentes(); // Atualiza a lista após o processamento
    } catch (err) {
      console.error(err);
    }
  };

  // Carregar as solicitações pendentes ao montar o componente
  useEffect(() => {
    fetchSolicitacoesPendentes();
  }, []);

  return (
    <div className="bg-green-200 min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-green-300 p-8 rounded-lg border-8 border-green-200">
        <h1 className="text-white text-3xl font-inter font-extrabold mb-6 drop-shadow-sm text-center">
          Gerenciar Solicitações de Cartão
        </h1>

        {/* Exibição das solicitações */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {solicitacoes.length === 0 ? (
          <p className="text-gray-800 text-center">
            Nenhuma solicitação pendente encontrada.
          </p>
        ) : (
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-green-400 text-white">
                <th className="p-4">ID</th>
                <th className="p-4">Usuário</th>
                <th className="p-4">PDF</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {solicitacoes.map((solicitacao) => (
                <tr key={solicitacao.id}>
                  <td className="p-4">{solicitacao.id}</td>
                  <td className="p-4">{solicitacao.idUser}</td>
                  <td className="p-4">
                    <a
                      href={`http://localhost:3000/uploads/${solicitacao.pdfPath
                        .split("/")
                        .pop()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Ver PDF
                    </a>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() =>
                        processarSolicitacao(solicitacao.id, "aprovado")
                      }
                      className="bg-green-500 text-white py-1 px-2 rounded"
                    >
                      Aceitar
                    </button>
                    <button
                      onClick={() =>
                        processarSolicitacao(solicitacao.id, "rejeitado")
                      }
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Recusar
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

export default GerenciarSolicitacao;
