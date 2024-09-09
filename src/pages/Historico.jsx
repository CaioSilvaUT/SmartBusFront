import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const HistoricoViagens = () => {
  const [historico, setHistorico] = useState([]);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Controllers/historicoViagens/${userInfo.data.id}`
        );
        setHistorico(response.data.historicoViagens);
      } catch (err) {
        console.error("Erro ao buscar histórico de viagens:", err);
        setError("Erro ao buscar histórico de viagens.");
      }
    };

    fetchHistorico();
  }, [userInfo.data.id]);

  return (
    <div className="bg-green-200 min-h-screen flex items-center justify-center">
      <div className="shadow-lg bg-green-300 w-full max-w-4xl p-8 rounded-lg border-8 border-green-200">
        <h1 className="text-white text-3xl font-inter font-extrabold mb-6 drop-shadow-sm text-center">
          Histórico de Viagens
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="bg-green-100 bg-opacity-60 p-6 rounded-lg">
          {historico.length === 0 ? (
            <p className="text-gray-800 text-center">
              Nenhuma viagem encontrada.
            </p>
          ) : (
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-green-400 text-white">
                  <th className="p-4">ID</th>
                  <th className="p-4">Data</th>
                  <th className="p-4">Descrição</th>
                  <th className="p-4">Valor</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((viagem) => (
                  <tr key={viagem.id}>
                    <td className="p-4">{viagem.id}</td>
                    <td className="p-4">{viagem.data}</td>
                    <td className="p-4">{viagem.descricao}</td>
                    <td className="p-4">{viagem.valor}</td>
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

export default HistoricoViagens;
