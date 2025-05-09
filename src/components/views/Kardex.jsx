import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/kardex.css";
import Navbar from "../Global.jsx";

const env = {
  VITE_HOSTNAME: import.meta.env.VITE_HOSTNAME
};

function KardexFacturas() {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFacturasKardex = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://${env.VITE_HOSTNAME}/facturas/factura-kardex/kardex`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();
      
      if (data.status === 200) {
        setMovimientos(data.message);
      } else {
        setError(data.message || "Error al cargar el kardex de facturas");
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

  const calcularTotales = () => {
    const totalVentas = movimientos.reduce((sum, mov) => sum + mov.subtotal_venta, 0);
    const totalCompras = movimientos.reduce((sum, mov) => sum + mov.subtotal_costo, 0);
    const ganancias = totalVentas - totalCompras;
    
    return {
      totalVentas,
      totalCompras,
      ganancias
    };
  };

  useEffect(() => {
    fetchFacturasKardex();
  }, []);

  const { totalVentas, totalCompras, ganancias } = calcularTotales();

  return (
    <>
      <Navbar />
      
      <div className="container">
        <div className="titulo-container">
          <h3>KARDEX DE FACTURAS</h3>
        </div>

        {loading && (
          <div className="loading-container">
            <p>Cargando movimientos...</p>
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
                      <th>Número Factura</th>
                      <th>Código Artículo</th>
                      <th>Artículo</th>
                      <th>Naturaleza</th>
                      <th>Unidades</th>
                      <th>Precio Unitario</th>
                      <th>Subtotal Venta</th>
                      <th>Subtotal Costo</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movimientos.map((movimiento) => (
                      <tr key={movimiento._id}>
                        <td>{movimiento.numero_factura}</td>
                        <td>{movimiento.codigo_articulo}</td>
                        <td>{movimiento.nombre_articulo}</td>
                        <td style={{
                          color: movimiento.naturaleza === 'positiva (+)' ? '#17a01e' : '#e20808',
                          fontWeight: 'bold'
                        }}>
                          {movimiento.naturaleza}
                        </td>
                        <td>{movimiento.unidades}</td>
                        <td>
                          {movimiento.naturaleza === 'positiva (+)' ? 
                            `$${movimiento.costo_unitario?.toLocaleString('es-ES') || '0'}` : 
                            `$${movimiento.precio_venta_unitario?.toLocaleString('es-ES') || '0'}`}
                        </td>
                        <td style={{ 
                          color: movimiento.subtotal_venta > 0 ? '#17a01e' : '#333',
                          fontWeight: 'bold' 
                        }}>
                          ${movimiento.subtotal_venta.toLocaleString('es-ES')}
                        </td>
                        <td style={{ 
                          color: movimiento.subtotal_costo > 0 ? '#e20808' : '#333',
                          fontWeight: 'bold' 
                        }}>
                          ${movimiento.subtotal_costo.toLocaleString('es-ES')}
                        </td>
                        <td>
                          <button
                            className="btn-ver"
                            onClick={() => handleVerFactura(movimiento.numero_factura)}
                          >
                            Ver factura
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

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

export default KardexFacturas;