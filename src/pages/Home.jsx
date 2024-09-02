import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import olho_icon from "../assets/olho-icon.png";
import historico_icon from "../assets/historico-icon.png";

const Home = () => {
  return (
    <div className="home">
      <section className="infos">
        <div className="saldo">
          <p>Saldo: R$</p>
          {/* Conectar com o backend para exibir o saldo real */}
          <p className="amount">0,00</p>
        </div>
        <div className="buttons">
          <Link to="/criarcarteirinha">
            <button>Visualizar cartão</button>
          </Link>
        </div>
      </section>
      <section className="functions">
        <div className="box">
          <div className="visualizar_horarios">
            <div className="icon-placeholder">
              <img src={olho_icon} alt="Ícone para Visualizar Horários" />
            </div>
            <p>Visualizar horários</p>
          </div>
          <div className="visualizar_historico">
            <div className="icon-placeholder">
              <img src={historico_icon} alt="Ícone para Visualizar Histórico" />
            </div>
            <p>Visualizar histórico</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
