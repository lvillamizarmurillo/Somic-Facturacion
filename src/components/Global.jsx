import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <h3>SIMIC</h3>
      </div>
      <div className="navbar-buttons">
        <button 
          className={`navbar-button ${isActive('/registrar-cliente')}`}
          onClick={() => navigate('/registrar-cliente')}
        >
          Registrar Cliente
        </button>
        <button 
          className={`navbar-button ${isActive('/')}`}
          onClick={() => navigate('/')}
        >
          Crear Facturas
        </button>
        <button 
          className={`navbar-button ${isActive('/ver-facturas')}`}
          onClick={() => navigate('/ver-facturas')}
        >
          Ver Facturas
        </button>
        <button 
          className={`navbar-button ${isActive('/kardex')}`}
          onClick={() => navigate('/kardex')}
        >
          Kardex
        </button>
      </div>
    </nav>
  );
};

export default Navbar;