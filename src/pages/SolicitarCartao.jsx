import React, { useState } from "react";
import "./SolicitarCartao.css";

const SolicitarCartao = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar o arquivo para o backend
    console.log("Arquivo enviado:", file);
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
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="btn-solicitar">
            Solicitar
          </button>
        </form>
      </section>
    </div>
  );
};

export default SolicitarCartao;
