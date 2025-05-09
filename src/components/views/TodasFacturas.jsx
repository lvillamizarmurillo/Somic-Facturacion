import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/todasFacturas.css";
import Navbar from "../Global.jsx";

const env = {
  VITE_HOSTNAME: import.meta.env.VITE_HOSTNAME,
  PORT_BACKEND: import.meta.env.VITE_PORT_BACKEND
};

function TodasFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFacturas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://${env.VITE_HOSTNAME}:${env.PORT_BACKEND}/facturas`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();
      
      if (data.status === 200) {
        setFacturas(data.message);
      } else {
        setError(data.message || "Error al cargar las facturas");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerFactura = (numeroFactura) => {
    navigate(`/factura/${numeroFactura}`);
  };

  // Calcular totales
  const calcularTotales = () => {
    const totalVentas = facturas.reduce((sum, factura) => sum + factura.total_Venta, 0);
    const totalCompras = facturas.reduce((sum, factura) => sum + factura.total_Costo, 0);
    const ganancias = totalVentas - totalCompras;
    
    return {
      totalVentas,
      totalCompras,
      ganancias
    };
  };

  useEffect(() => {
    fetchFacturas();
  }, []);

  const { totalVentas, totalCompras, ganancias } = calcularTotales();

  return (
    <>
      <Navbar />
      
      <div className="container">
        <div className="titulo-container">
          <h3>TODAS LAS FACTURAS</h3>
        </div>

        {loading && (
          <div className="loading-container">
            <p>Cargando facturas...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="contenedor-tabla-responsive">
              <div className="contenedor-scroll-tabla">
                <table className="tabla-facturas">
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Cliente</th>
                      <th>Fecha Emisión</th>
                      <th>Fecha Vencimiento</th>
                      <th>Estado</th>
                      <th>Total Venta</th>
                      <th>Total Costo</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facturas.map((factura) => (
                      <tr key={factura._id}>
                        <td>{factura.numero}</td>
                        <td>{factura.nit_cliente}</td>
                        <td>{new Date(factura.fecha).toLocaleDateString('es-ES')}</td>
                        <td>{new Date(factura.fecha_vencimiento).toLocaleDateString('es-ES')}</td>
                        <td style={{
                          color: factura.estado === 'pendiente' ? '#e20808' : '#17a01e',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {factura.estado}
                        </td>
                        <td style={{ color: '#17a01e', fontWeight: 'bold' }}>
                          ${factura.total_Venta.toLocaleString('es-ES')}
                        </td>
                        <td style={{ color: '#e20808', fontWeight: 'bold' }}>
                          ${factura.total_Costo.toLocaleString('es-ES')}
                        </td>
                        <td>
                          <button
                            className="btn-ver"
                            onClick={() => handleVerFactura(factura.numero)}
                          >
                            Ver más
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabla de resumen */}
            <div className="resumen-container">
              <table className="tabla-resumen">
                <thead>
                  <tr>
                    <th colSpan="3">Resumen General</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Ventas</td>
                    <td>Total Compras</td>
                    <td>Ganancias</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#17a01e', fontWeight: 'bold' }}>
                      ${totalVentas.toLocaleString('es-ES')}
                    </td>
                    <td style={{ color: '#e20808', fontWeight: 'bold' }}>
                      ${totalCompras.toLocaleString('es-ES')}
                    </td>
                    <td style={{ 
                      color: ganancias >= 0 ? '#17a01e' : '#e20808', 
                      fontWeight: 'bold' 
                    }}>
                      ${Math.abs(ganancias).toLocaleString('es-ES')}
                      {ganancias < 0 && ' (Pérdida)'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TodasFacturas;