import "../../css/facturaDetalle.css";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const env = {
  VITE_HOSTNAME: import.meta.env.VITE_HOSTNAME,
  PORT_BACKEND: import.meta.env.VITE_PORT_BACKEND
};

function VerFactura() {
  const { facturaId } = useParams();
  const [facturaData, setFacturaData] = useState(null);
  const [fechaFormateada, setFechaFormateada] = useState('');
  const [fechaVencimientoFormateada, setFechaVencimientoFormateada] = useState('');

  const fetchData = async (url) => {
    try {
      const response = await fetch(`http://${env.VITE_HOSTNAME}:${env.PORT_BACKEND}${url}`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchDatosFactura = async () => {
    const response = await fetchData(`/facturas/completa/${facturaId}`);
    if(response && response.status === 200) {
      setFacturaData(response.message[0]);
      formatFecha(response.message[0].fecha);
      formatFechaVencimiento(response.message[0].fecha_vencimiento);
    }
  };

  const formatFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    setFechaFormateada(`${dia}-${mes}-${fecha.getFullYear()}`);
  };

  const formatFechaVencimiento = (fechaString) => {
    const fecha = new Date(fechaString);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    setFechaVencimientoFormateada(`${dia}-${mes}-${fecha.getFullYear()}`);
  };

  useEffect(() => {
    fetchDatosFactura();
  }, []);

  return (
    <>
      <div className="container">
        <div className="titulo-container">
          <h3>FACTURA SIMIC</h3>
        </div>
        <div className="datos-factura">
          <div className="primera-informacion">
            <div className="input"><p className="custom-input">{facturaData?.numero || ''}</p></div>
            <div className="texto-input"><p>Número de factura</p></div>
          </div>
          <div className="primera-informacion">
            <div className="input"><p className="custom-input">{fechaFormateada}</p></div>
            <div className="texto-input"><p>Fecha de emisión</p></div>
          </div>
          <div className="primera-informacion">
            <div className="input"><p className="custom-input">{fechaVencimientoFormateada}</p></div>
            <div className="texto-input"><p>Fecha de vencimiento</p></div>
          </div>
        </div>
        <div className="container-primer-buscador">
          <div className="segunda-informacion-nit">
            <div className="input">
              <p className="custom-input">{facturaData?.nit_cliente || ''}</p>
            </div>
            <div className="texto-input"><p>Nit Empresa</p></div>
          </div>
          <div className="segunda-informacion-nombre">
            <div className="input">
              <p className="custom-input">{facturaData?.nombre_cliente || ''}</p>
            </div>
            <div className="texto-input"><p>Nombre</p></div>
          </div>
          <div className="segunda-informacion">
            <div className="input">
              <p className="custom-input">{facturaData?.estado ? facturaData.estado.charAt(0).toUpperCase() + facturaData.estado.slice(1) : ''}</p>
            </div>
            <div className="texto-input"><p>Estado</p></div>
          </div>
          <div className="segunda-informacion">
            <div className="input">
              <p className="custom-input">{`$ ${facturaData?.total_Venta?.toLocaleString() || '0'}`}</p>
            </div>
            <div className="texto-input"><p>Total Venta</p></div>
          </div>
          <div className="segunda-informacion">
            <div className="input">
              <p className="custom-input">{`$ ${facturaData?.total_Costo?.toLocaleString() || '0'}`}</p>
            </div>
            <div className="texto-input"><p>Total Costo</p></div>
          </div>
        </div>
        <div className="container-tabla-articulos">
          <div className="tabla-articulos">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Laboratorio</th>
                  <th>Naturaleza</th>
                  <th>Unidades</th>
                  <th>Precio Venta</th>
                  <th>Precio Costo</th>
                </tr>
              </thead>
              <tbody>
                {facturaData?.articulos?.map((articulo, index) => (
                  <tr key={index}>
                    <td>{articulo.codigo_articulo}</td>
                    <td>{articulo.nombre_articulo}</td>
                    <td>{articulo.laboratorio || '-'}</td>
                    <td>{articulo.naturaleza}</td>
                    <td>{articulo.unidades}</td>
                    <td>{articulo.precio_venta_unitario > 0 ? `$ ${articulo.precio_venta_unitario.toFixed(2)}` : '$ 0.00'}</td>
                    <td>{articulo.costo_unitario > 0 ? `$ ${articulo.costo_unitario.toFixed(2)}` : '$ 0.00'}</td>
                  </tr>
                ))}
                <tr className="fila-total">
                  <td colSpan={4}></td>
                  <td>Total</td>
                  <td>$ {facturaData?.total_Venta?.toFixed(2) || '0.00'}</td>
                  <td>$ {facturaData?.total_Costo?.toFixed(2) || '0.00'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerFactura;