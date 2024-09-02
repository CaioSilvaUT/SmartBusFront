import React from 'react';
import { Link } from 'react-router-dom';
import "./VerCarteirinha.css";
import icon_icon from "../assets/icon_icon.png";



const VerCarteirinha = () => {
  return (
    <div className="carteirinha">
      <section className="perfil">
        <div className="icone">
          <img src={icon_icon} alt="Foto de Perfil" />
        </div>
        <div className="nome-icon">
        {/* Conectar com o backend para exibir o nome real */}
          Nome do usuario
        </div>
      </section>
      <section className= "dados">
        <div className="nome">
          <p>
            Nome: 
          </p>
          <div>
            {/* Conectar com o backend para exibir o nome real */}
            Nome do usuario
          </div>
        </div>
        <div className="tipo">
          <p>
            Tipo: 
          </p>
          <div>
            {/* Conectar com o backend para exibir o tipo real */}
            Carteirinha do tipo
          </div>
        </div>       
        <div className="saldo">
          <p>
            Saldo: 
          </p>
          <div>
            {/* Conectar com o backend para exibir o saldo real */}
            0,00
          </div>
        </div>       
        <div className="data-criacao">
          <p>
            Data da criação: 
          </p>
          <div>
            {/* Conectar com o backend para exibir a data real */}
            XX/YY/ZZ
          </div>
        </div>        
        <div className="data-vencimento">
          <p>
            Data de vencimento: 
          </p>
          <div>
            {/* Conectar com o backend para exibir a data real */}
            XX/YY/ZZ
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerCarteirinha;
