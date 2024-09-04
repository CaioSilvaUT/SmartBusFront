import React from 'react';
import { Link } from 'react-router-dom';
import "./VerHorarios.css";
import historico from "../assets/historico.png";
import terminal_utf from "../assets/terminal-utf.png";
import utf_terminal from "../assets/utf-terminal.png";



const VerHorarios = () => {
  return (
    <div className="verhorarios">
      <section className="conteudo">
        <div className="horarios">
          <div className='utf-terminal'>
            <img src={utf_terminal} alt ="Horarios utfpr - terminal" />
          </div>
          <div className='terminal-utf'>
            <img src={terminal_utf} alt ="Horarios terminal - utfpr" />
          </div>
        </div>
        <div className="icon-visualizar">
            <div className="icon-historico">
              <img src={historico} alt ="Icone de historico" />
            </div>
            <div className='visualizar-historico'>
              <button>Visualizar histórico</button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default VerHorarios;
