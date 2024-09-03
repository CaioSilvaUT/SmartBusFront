import React, { useState } from "react";
import "./GerenciarNotificacao.css";

const GerenciarNotificacao = () => {
  // Exemplo de dados de notificações
  const [notificacoes, setNotificacoes] = useState([
    { id: 1, nome: "Usuário 1", tipo: "Idoso" },
    { id: 2, nome: "Usuário 2", tipo: "Estudante" },
    { id: 3, nome: "Usuário 3", tipo: "Comum" },
    // Adicione mais notificações conforme necessário
  ]);

  const handleAceitar = (id) => {
    console.log(`Notificação ${id} aceita`);
    // Lógica para aceitar a notificação
  };

  const handleRecusar = (id) => {
    console.log(`Notificação ${id} recusada`);
    // Lógica para recusar a notificação
  };

  return (
    <div className="notificacoes-cartao">
      <section className="lista-notificacoes">
        <h1>Notificações de Geração de Cartão</h1>
        {notificacoes.map((notificacao) => (
          <div key={notificacao.id} className="notificacao">
            <div className="detalhes">
              <p>
                <strong>Nome:</strong> {notificacao.nome}
              </p>
              <p>
                <strong>Tipo de Cartão:</strong> {notificacao.tipo}
              </p>
            </div>
            <div className="acoes">
              <button
                onClick={() => handleAceitar(notificacao.id)}
                className="btn-aceitar"
              >
                Aceitar
              </button>
              <button
                onClick={() => handleRecusar(notificacao.id)}
                className="btn-recusar"
              >
                Recusar
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default GerenciarNotificacao;
