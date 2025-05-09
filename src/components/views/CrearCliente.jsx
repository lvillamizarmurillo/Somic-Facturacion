import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/registrarCliente.css";
import Navbar from "../Global.jsx";

const env = {
  VITE_HOSTNAME: import.meta.env.VITE_HOSTNAME
};

function RegistrarCliente() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState('cliente');
  const [formData, setFormData] = useState({
    documento: '',
    nombre: '',
    cupo: '',
    plazo_dias: '',
    codigo: '',
    nombre_articulo: '',
    laboratorio: '',
    saldo: '',
    costo_unidad: ''
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
      const response = await fetch(`https://${env.VITE_HOSTNAME}`, {
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

  const postArticulo = async (articuloData) => {
    try {
      const response = await fetch(`https://${env.VITE_HOSTNAME}/articulos`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          codigo: articuloData.codigo,
          nombre: articuloData.nombre_articulo,
          laboratorio: articuloData.laboratorio,
          saldo: articuloData.saldo,
          costo_unidad: articuloData.costo_unidad
        })
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
      if (formType === 'cliente') {
        const clienteData = {
          documento: formData.documento,
          nombre: formData.nombre,
          cupo: parseFloat(formData.cupo),
          plazo_dias: parseInt(formData.plazo_dias)
        };
        
        const result = await postCliente(clienteData);
        
        if (result.status === 200) {
          alert(result.message || "Cliente registrado exitosamente");
          resetForm();
        } else {
          alert(result.message || "Error al registrar el cliente");
        }
      } else {
        const articuloData = {
          codigo: formData.codigo,
          nombre_articulo: formData.nombre_articulo,
          laboratorio: formData.laboratorio,
          saldo: parseInt(formData.saldo),
          costo_unidad: parseFloat(formData.costo_unidad)
        };
        
        const result = await postArticulo(articuloData);
        
        if (result.status === 200) {
          alert(result.message || "Artículo registrado exitosamente");
          resetForm();
        } else {
          alert(result.message || "Error al registrar el artículo");
        }
      }
    } catch (error) {
      alert(`Ocurrió un error al registrar el ${formType === 'cliente' ? 'cliente' : 'artículo'}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      documento: '',
      nombre: '',
      cupo: '',
      plazo_dias: '',
      codigo: '',
      nombre_articulo: '',
      laboratorio: '',
      saldo: '',
      costo_unidad: ''
    });
  };

  const switchFormType = (type) => {
    setFormType(type);
    resetForm();
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="client-register-container">
          <div className="register-header">
            <h3>{formType === 'cliente' ? 'REGISTRAR NUEVO CLIENTE' : 'REGISTRAR NUEVO ARTÍCULO'}</h3>
          </div>
          
          <div className="form-type-selector">
            <button
              className={`form-type-button ${formType === 'cliente' ? 'active' : ''}`}
              onClick={() => switchFormType('cliente')}
            >
              Crear Cliente
            </button>
            <button
              className={`form-type-button ${formType === 'articulo' ? 'active' : ''}`}
              onClick={() => switchFormType('articulo')}
            >
              Crear Artículo
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="client-form">
            <div className="form-fields-group">
              {formType === 'cliente' ? (
                <>
                  <div className="form-field">
                    <div className="field-input">
                      <input
                        type="text"
                        name="documento"
                        value={formData.documento}
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
                  
                  <div className="form-field">
                    <div className="field-input">
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
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
                  
                  <div className="form-field">
                    <div className="field-input">
                      <input
                        type="number"
                        name="cupo"
                        value={formData.cupo}
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
                  
                  <div className="form-field">
                    <div className="field-input">
                      <input
                        type="number"
                        name="plazo_dias"
                        value={formData.plazo_dias}
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
                </>
              ) : (
                <>
                  <div className="form-field">
                    <div className="field-input">
                      <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Código del artículo"
                        required
                      />
                    </div>
                    <div className="field-label">
                      <span>Código</span>
                    </div>
                  </div>
                  
                  <div className="form-field">
                    <div className="field-input">
                      <input
                        type="text"
                        name="nombre_articulo"
                        value={formData.nombre_articulo}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Nombre del artículo"
                        required
                      />
                    </div>
                    <div className="field-label">
                      <span>Nombre</span>
                    </div>
                  </div>
                  
                  <div className="form-field">
                    <div className="field-input">
                      <input
                        type="text"
                        name="laboratorio"
                        value={formData.laboratorio}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Laboratorio"
                        required
                      />
                    </div>
                    <div className="field-label">
                      <span>Laboratorio</span>
                    </div>
                  </div>
                  
                  <div className="form-field">
                    <div className="field-input">
                      <input
                        type="number"
                        name="saldo"
                        value={formData.saldo}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Saldo inicial"
                        min="0"
                        required
                      />
                    </div>
                    <div className="field-label">
                      <span>Saldo</span>
                    </div>
                  </div>
                  
                  <div className="form-field">
                    <div className="field-input">
                      <input
                        type="number"
                        name="costo_unidad"
                        value={formData.costo_unidad}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Costo unitario"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                    <div className="field-label">
                      <span>Costo Unitario ($)</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
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
                  {loading ? 'Guardando...' : `Guardar ${formType === 'cliente' ? 'Cliente' : 'Artículo'}`}
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