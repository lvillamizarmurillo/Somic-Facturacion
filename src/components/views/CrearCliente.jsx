import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/registrarCliente.css";
import Navbar from "../Global.jsx";

const env = {
  VITE_HOSTNAME: import.meta.env.VITE_HOSTNAME,
  PORT_BACKEND: import.meta.env.VITE_PORT_BACKEND
};

function RegistrarCliente() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    documento: null,
    nombre: null,
    cupo: null,
    plazo_dias: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const postCliente = async (clienteData) => {
    
    try {
      const response = await fetch(`http://${env.VITE_HOSTNAME}:${env.PORT_BACKEND}/cliente`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(clienteData)
      });
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const clienteData = {
        documento: formData.documento,
        nombre: formData.nombre,
        cupo: parseFloat(formData.cupo),
        plazo_dias: parseInt(formData.plazo_dias)
      };
      
      const result = await postCliente(clienteData);
      
      if (result.status === 200) {
        alert(result.message || "Cliente registrado exitosamente");
        setFormData({
          documento: null,
          nombre: null,
          cupo: null,
          plazo_dias: null
        });
      } else {
        alert(result.message || "Error al registrar el cliente");
      }
    } catch (error) {
      alert("Ocurrió un error al registrar el cliente");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="client-register-container">
          <div className="register-header">
            <h3>REGISTRAR NUEVO CLIENTE</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="client-form">
            <div className="form-fields-group">
              {/* Documento */}
              <div className="form-field">
                <div className="field-input">
                  <input
                    type="text"
                    name="documento"
                    value={formData.documento || ''}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="NIT o Documento"
                    required
                  />
                </div>
                <div className="field-label">
                  <span>Documento</span>
                </div>
              </div>
              
              {/* Nombre */}
              <div className="form-field">
                <div className="field-input">
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre || ''}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Nombre del cliente"
                    required
                  />
                </div>
                <div className="field-label">
                  <span>Nombre</span>
                </div>
              </div>
              
              {/* Cupo */}
              <div className="form-field">
                <div className="field-input">
                  <input
                    type="number"
                    name="cupo"
                    value={formData.cupo || ''}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Cupo de crédito"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="field-label">
                  <span>Cupo ($)</span>
                </div>
              </div>
              
              {/* Plazo en días */}
              <div className="form-field">
                <div className="field-input">
                  <input
                    type="number"
                    name="plazo_dias"
                    value={formData.plazo_dias || ''}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Plazo en días"
                    min="1"
                    required
                  />
                </div>
                <div className="field-label">
                  <span>Plazo (días)</span>
                </div>
              </div>
            </div>
            
            {/* Botones */}
            <div className="form-actions">
              <button 
                type="button" 
                className="secondary-button"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                <span className="button-content">Crear Factura</span>
              </button>
              
              <button 
                type="submit" 
                className="primary-button"
                disabled={loading}
              >
                <span className="button-content">
                  {loading ? 'Guardando...' : 'Guardar Cliente'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistrarCliente;