import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const SolicitarCartao = () => {
  const [file, setFile] = useState(null);
  const [tipo, setTipo] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

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
      await axios.post(
        `http://localhost:3000/Controllers/solicitarCartao/${userInfo.data.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("Solicitação de cartão enviada com sucesso!");
      setError("");
      setFile(null);
      setTipo("");
    } catch (err) {
      setError("Erro ao enviar a solicitação.");
      setMessage("");
      console.error(err);
    }
  };

  return (
    <div className="shadow-lg bg-green-300 p-8 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Solicitar Cartão
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="block text-white font-bold mb-2">
            Arquivo PDF
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full py-2 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
        </div>
        <div>
          <label htmlFor="tipo" className="block text-white font-bold mb-2">
            Tipo de Cartão
          </label>
          <select
            id="tipo"
            name="tipo"
            value={tipo}
            onChange={handleTipoChange}
            className="w-full py-2 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="" disabled>
              Selecione o tipo
            </option>
            <option value="0">Estudante</option>
            <option value="1">Comum</option>
            <option value="2">Idoso</option>
          </select>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="bg-transparent font-bold text-white py-2 px-4 border-2 border-grey rounded-lg hover:bg-green-400 transition duration-300"
          >
            Enviar Solicitação
          </button>
        </div>
        {message && (
          <div className="mt-4 text-green-500 text-center">{message}</div>
        )}
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default SolicitarCartao;
