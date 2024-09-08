import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GerenciarNotificacao.css";

const GerenciarNotificacao = ({ idNotificacao, idUser }) => {
  const [notificacao, setNotificacao] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar notificação por ID
  const fetchNotificacaoById = async (id) => {
    try {
      const response = await axios.get(`/getByIdNotificacao/${id}`);
      setNotificacao(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Função para buscar notificações por idUser
  const fetchNotificacoesByUserId = async (idUser) => {
    try {
      const response = await axios.get(`/getNotificacaoByUserId/${idUser}`);
      setNotificacoes(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Carrega notificações baseado no idNotificacao ou idUser
  useEffect(() => {
    if (idNotificacao) {
      fetchNotificacaoById(idNotificacao);
    } else if (idUser) {
      fetchNotificacoesByUserId(idUser);
    }
  }, [idNotificacao, idUser]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Renderiza uma notificação específica
  if (idNotificacao && notificacao) {
    return (
      <div className="notificacao-detalhe">
        <h1>Detalhes da Notificação</h1>
        <p>
          <strong>ID:</strong> {notificacao.id}
        </p>
        <p>
          <strong>Mensagem:</strong> {notificacao.mensagem}
        </p>
        <p>
          <strong>Status:</strong> {notificacao.status}
        </p>
      </div>
    );
  }

  // Renderiza notificações do usuário
  if (idUser && notificacoes.length > 0) {
    return (
      <div className="lista-notificacoes">
        <h1>Notificações do Usuário</h1>
        {notificacoes.map((notif) => (
          <div key={notif.id} className="notificacao">
            <p>
              <strong>ID:</strong> {notif.id}
            </p>
            <p>
              <strong>Mensagem:</strong> {notif.mensagem}
            </p>
            <p>
              <strong>Status:</strong> {notif.status}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return <div>Não há notificações para exibir.</div>;
};

export default GerenciarNotificacao;
