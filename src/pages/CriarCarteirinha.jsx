import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import "./CriarCarteirinha.css";

const CriarCarteirinha = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Tipo');
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false); // Fecha o dropdown após selecionar uma opção
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Funções de navegação
  const goToCreditPage = () => {
    navigate('/creditos');
  };

  const goToCreatePage = () => {
    navigate('/vercarteirinha');
  };

  return (
    <div className="cadastro">
      <p className="pergunta">
        Você não possui carteirinha, deseja criar uma?
      </p>
      <p className="cadastrarCarteirinha">
        Selecione uma carteirinha
      </p>
      <div className="tipo-dropdown">
        <button 
          onClick={toggleDropdown} 
          ref={buttonRef}
        >
          {selectedOption}
        </button>
        <div 
          className={`dropdown-content ${dropdownVisible ? 'show' : ''}`} 
          ref={dropdownRef}
        >
          <a href="#" onClick={() => handleOptionClick('Carteirinha Comum')}>Carteirinha Comum</a>
          <a href="#" onClick={() => handleOptionClick('Carteirinha Idoso')}>Carteirinha Idoso</a> 
          <a href="#" onClick={() => handleOptionClick('Carteirinha Estudante')}>Carteirinha Estudante</a> 
        </div>
      </div>
      <div className="opcao-criar">
        <button className='creditos' onClick={goToCreditPage}>
          Adicionar Créditos e Criar
        </button>
        <button className='criar' onClick={goToCreatePage}>
          Criar
        </button>
      </div>
    </div>
  );
};

export default CriarCarteirinha;
