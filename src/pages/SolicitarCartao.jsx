import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SolicitarCartap.css";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null); // Estado para o arquivo PDF
  const [tipo, setTipo] = useState(""); // Estado para o tipo de cartão
  const [resData, setResData] = useState("");
  const { userInfo } = useSelector((state) => state.auth); // Obtendo userInfo do Redux

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Por favor, selecione um arquivo PDF.");
      return;
    }

    if (!tipo) {
      alert("Por favor, selecione o tipo de cartão.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tipo", tipo); // Adicionando o tipo de cartão
    formData.append("idUser", userInfo.data.id);

    axios
      .post("http://localhost:3000/solicitarCartao", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("Solicitação enviada com sucesso!");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Erro ao enviar a solicitação.");
      });
  };

  return (
    <div className="solicitar-cartao">
      <section className="formulario">
        <h2>Solicitar Cartão</h2>
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="file">Upload do Arquivo (PDF):</label>
            <input
              type="file"
              id="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])} // Atualiza o estado com o arquivo selecionado
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="tipo">Tipo de Cartão:</label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)} // Atualiza o estado com o tipo selecionado
              required
            >
              <option value="">Selecione um tipo</option>
              <option value="Estudante">Estudante</option>
              <option value="Idoso">Idoso</option>
              <option value="Comum">Comum</option>
              {/* Adicione mais opções conforme necessário */}
            </select>
          </div>
          <button type="submit" className="btn-solicitar">
            Solicitar
          </button>
        </form>
      </section>
    </div>
  );
};

export default App;
