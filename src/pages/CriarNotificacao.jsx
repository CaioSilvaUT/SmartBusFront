import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './CriarNotificacao.css';

const CriarNotificacao = () => {
  const [texto, setTexto] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [isRead, setIsRead] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/createNotificacao', {
        idUser: userInfo.id,
        texto,
        dataHora,
        isRead,
      });
      console.log('Notificação criada com sucesso:', response.data);
      // Adicione aqui qualquer ação adicional após a criação da notificação, como redirecionar ou exibir uma mensagem de sucesso
    } catch (err) {
      console.error('Erro ao criar notificação:', err);
      setError('Erro ao criar notificação.');
    }
  };

  return (
    <div className="criar-notificacao">
      <h1>Criar Notificação</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="texto">Texto:</label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="dataHora">Data e Hora:</label>
          <input
            type="datetime-local"
            id="dataHora"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isRead">Lida:</label>
          <input
            type="checkbox"
            id="isRead"
            checked={isRead}
            onChange={(e) => setIsRead(e.target.checked)}
          />
        </div>
        <button type="submit">Criar Notificação</button>
      </form>
    </div>
  );
};

export default CriarNotificacao;
