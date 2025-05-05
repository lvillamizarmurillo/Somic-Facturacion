import "../../css/facturaDetalle.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const env = {
  VITE_HOSTNAME: import.meta.env.VITE_HOSTNAME,
  PORT_BACKEND: import.meta.env.VITE_PORT_BACKEND
};

function FacturaDetalle() {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['facturas']);
  const [data, setData] = useState(null);
  const [dataCliente, setDataCliente] = useState(null);
  const [dataArticulo, setDataArticulo] = useState(null);
  const [dataArticulos, setDataArticulos] = useState(null);
  const [costoUnidad, setCostoUnidad] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [unidades, setUnidades] = useState("");
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedArticulo, setSelectedArticulo] = useState('');
  const [numeroAleatorio, setNumeroAleatorio] = useState('');
  const [fechaActual, setFechaActual] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [naturaleza, setNaturaleza] = useState('Positiva (+)');
  const [articulosFactura, setArticulosFactura] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const fetchData = async (url) => {
    try {
      const response = await fetch(`http://${env.VITE_HOSTNAME}:${env.PORT_BACKEND}${url}`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();
      if(data.status === 200) return data.message;
      return null;
    } catch (error) {
      return null;
    }
  };

  const fetchDataClienteNit = async (id) => {
    const response = await fetchData(`/cliente/${id}`);
    if(response){
      obtenerFechaVencimiento(new Date(), response[0].plazo_dias || 0);
      setDataCliente(response);
      cargarArticulosDeCookie(id);
    }
  };

  const fetchDataArticulo = async (id) => {
    const response = await fetchData(`/articulos/${id}`);
    if(response) setDataArticulo(response);
  };

  const postFacturas = async (facturaData) => {
    try {
      const response = await fetch(`http://${env.VITE_HOSTNAME}:${env.PORT_BACKEND}/facturas`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(facturaData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchFacturasCliente = async (id) => {
    setLoading(true);
    try {
      const response = await fetchData(`/facturas/${id}`);
      if (response && response.length != 0) {
        setFacturas(response);
      } else {
        setFacturas([]);
      }
    } catch (error) {
      setFacturas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerFactura = (numeroFactura) => {
    navigate(`/factura/${numeroFactura}`);
  };

  const handleClienteChange = async (e) => {
    const nit = e.target.value;
    setSelectedCliente(nit);
    setDataArticulo(null);
    setArticulosFactura([]);
    setSelectedArticulo('');
    setUnidades("");
    setPrecioVenta("");
    setCostoUnidad("");

    Object.keys(cookies).forEach(cookieName => {
      if (cookieName.startsWith('factura_')) {
        removeCookie(cookieName, { path: '/' });
      }
    });

    if (nit) {
      await fetchDataClienteNit(nit);
    } else {
      setDataCliente(null);
    }
  };

  const borrarCookiesFacturas = () => {
    Object.keys(cookies).forEach(cookieName => {
      removeCookie(cookieName, { path: '/', expires: new Date(0) });
    });
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.trim().split('=');
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
    setArticulosFactura([]);
    setSelectedCliente('');
    setSelectedArticulo('');
  };

  const obtenerFechaVencimiento = (fecha, plazoDias) => {
    const hoy = new Date(fecha.getTime() + plazoDias * 24 * 60 * 60 * 1000);
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    setFechaVencimiento(`${dia}-${mes}-${hoy.getFullYear()}`);
  };

  const eliminarArticulo = (index) => {
    if (!dataCliente?.length) return;
    const nitCliente = dataCliente[0].documento;
    const nuevosArticulos = [...articulosFactura];
    nuevosArticulos.splice(index, 1);

    if (nuevosArticulos.length === 0) {
      removeCookie(`factura_${nitCliente}`, { path: '/' });
    } else {
      setCookie(`factura_${nitCliente}`, { articulos: nuevosArticulos }, { path: '/' });
    }

    setArticulosFactura(nuevosArticulos);
  };

  const cargarArticulosDeCookie = (nit) => {
    const cookieName = `factura_${nit}`;
    setArticulosFactura(cookies[cookieName]?.articulos || []);
  };

  const validateInput = (name, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      displayError(`El valor de ${name} debe ser mayor a 0`);
      return false;
    }
    return true;
  };

  const displayError = (message) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const agregarArticulo = () => {
    if (!dataArticulo?.length || !dataCliente?.length) {
      displayError('Seleccione un cliente y un artículo');
      return;
    }

    if (!validateInput('unidades', unidades) ||
        (naturaleza === 'Positiva (+)' && !validateInput('costo unitario', costoUnidad)) ||
        (naturaleza === 'Negativa (-)' && !validateInput('precio de venta', precioVenta))) {
      return;
    }

    if (parseInt(unidades) > dataArticulo[0].saldo) {
      displayError(`No hay suficiente stock. Saldo disponible: ${dataArticulo[0].saldo}`);
      return;
    }

    if (naturaleza === 'Negativa (-)' && parseFloat(precioVenta) < dataArticulo[0].costo_unidad) {
      displayError(`El precio de venta no puede ser menor al costo unitario ($${dataArticulo[0].costo_unidad.toFixed(2)})`);
      return;
    }

    const nitCliente = dataCliente[0].documento;
    const nuevoArticulo = {
      codigo_articulo: dataArticulo[0].codigo,
      nombre_articulo: dataArticulo[0].nombre,
      naturaleza: naturaleza.toLowerCase(),
      unidades: parseInt(unidades),
      precio_venta_unitario: naturaleza === 'Negativa (-)' ? parseFloat(precioVenta) : 0,
      costo_unitario: naturaleza === 'Positiva (+)' ? parseFloat(costoUnidad) : 0,
      laboratorio: dataArticulo[0].laboratorio,
      total: naturaleza === 'Negativa (-)' ? parseInt(unidades) * parseFloat(precioVenta) : parseInt(unidades) * parseFloat(costoUnidad)
    };

    const nuevosArticulos = [...articulosFactura, nuevoArticulo];
    setArticulosFactura(nuevosArticulos);
    setCookie(`factura_${nitCliente}`, { articulos: nuevosArticulos }, { path: '/' });

    setDataArticulo(null);
    setUnidades("");
    setPrecioVenta("");
    setCostoUnidad("");
  };

  const validarDisponible = () => {
    if (!dataCliente?.length) return true;
    const totalNegativos = articulosFactura.reduce((total, articulo) =>
      articulo.naturaleza.includes('negativa') ?
      total + (articulo.unidades * articulo.precio_venta_unitario) :
      total, 0);
    return totalNegativos <= (dataCliente[0].cupo - dataCliente[0].cartera);
  };

  const handleGuardarFactura = async () => {
    if (articulosFactura.length === 0) {
      displayError("Debe agregar al menos un artículo a la factura");
      return;
    }
  
    if (!dataCliente?.length) {
      displayError("Debe seleccionar un cliente");
      return;
    }
  
    const tieneNegativos = articulosFactura.some(art => art.naturaleza.includes('negativa'));
    if (tieneNegativos && !validarDisponible()) {
      displayError("El total de artículos con naturaleza negativa excede el disponible del cliente");
      return;
    }
  
    const totalVentaNegativos = articulosFactura.reduce((sum, art) =>
      art.naturaleza.includes('negativa') ?
      sum + (art.precio_venta_unitario * art.unidades) :
      sum, 0);
  
    const facturaData = {
      factura: {
        numero: `FE${numeroAleatorio}`,
        nit_cliente: dataCliente[0].documento
      },
      articulos: articulosFactura.map(articulo => ({
        numero_factura: `FE${numeroAleatorio}`,
        codigo_articulo: articulo.codigo_articulo,
        nombre_articulo: articulo.nombre_articulo,
        naturaleza: articulo.naturaleza,
        unidades: articulo.unidades,
        ...(articulo.naturaleza.includes('negativa') && {precio_venta_unitario: articulo.precio_venta_unitario}),
        ...(articulo.naturaleza.includes('positiva') && {costo_unitario: articulo.costo_unitario})
      })),
      plazo_dias: dataCliente[0].plazo_dias,
      cartera: dataCliente[0].cartera + totalVentaNegativos
    };
  
    try {
      const result = await postFacturas(facturaData);
  
      if (result.status == 200) {
        borrarCookiesFacturas();
        setDataCliente(null);
        setDataArticulo(null);
        setUnidades("");
        setPrecioVenta("");
        setCostoUnidad("");
        setNaturaleza('Positiva (+)');
        setSelectedCliente('');
        setSelectedArticulo('');
        
        const num = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
        setNumeroAleatorio(num.toString());
        
        const hoy = new Date();
        const dia = String(hoy.getDate()).padStart(2, '0');
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        setFechaActual(`${dia}-${mes}-${hoy.getFullYear()}`);
        setFechaVencimiento('');
        
        displayError("Factura guardada exitosamente");
      } else {
        displayError(result.message || "Error al guardar la factura");
      }
    } catch (error) {
      displayError("Ocurrió un error al intentar guardar la factura");
    }
  };

  useEffect(() => {
    if (dataArticulo?.length > 0) {
      const costo = dataArticulo[0].costo_unidad;
      setCostoUnidad(costo.toString());
      setPrecioVenta(costo.toString());
    }
  }, [dataArticulo]);

  useEffect(() => {
    borrarCookiesFacturas();
    setDataCliente(null);
    setDataArticulo(null);
    setArticulosFactura([]);
    setSelectedCliente('');
    setSelectedArticulo('');
    const generarNumero = () => {
      const num = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
      setNumeroAleatorio(num.toString());
    };

    const obtenerFechaActual = () => {
      const hoy = new Date();
      const dia = String(hoy.getDate()).padStart(2, '0');
      const mes = String(hoy.getMonth() + 1).padStart(2, '0');
      setFechaActual(`${dia}-${mes}-${hoy.getFullYear()}`);
    };

    const cargarDatosIniciales = async () => {
      borrarCookiesFacturas();
      generarNumero();
      obtenerFechaActual();
      setData(await fetchData('/cliente'));
      setDataArticulos(await fetchData('/articulos'));
    };

    cargarDatosIniciales();
  }, []);

  return (
    <>
      <div className="container">
        <div className="titulo-container">
          <h3>FACTURA SIMIC</h3>
        </div>
        <div className="datos-factura">
          <div className="primera-informacion">
            <div className="input"><p className="custom-input">{`FE${numeroAleatorio}`}</p></div>
            <div className="texto-input"><p>Número de factura</p></div>
          </div>
          <div className="primera-informacion">
            <div className="input"><p className="custom-input">{fechaActual}</p></div>
            <div className="texto-input"><p>Fecha de emisión</p></div>
          </div>
          <div className="primera-informacion">
            <div className="input"><p className="custom-input">{fechaVencimiento}</p></div>
            <div className="texto-input"><p>Fecha de vencimiento</p></div>
          </div>
        </div>
        <div className="container-primer-buscador">
          <div className="segunda-informacion-nit">
            <div className="input">
              <select
                className="custom-select"
                value={selectedCliente}
                onChange={handleClienteChange}
              >
                <option value="" disabled>Seleccione una opción</option>
                {data?.map((item, index) => (
                  <option key={index} value={item.documento}>{item.documento}</option>
                ))}
              </select>
            </div>
            <div className="texto-input"><p>Nit Empresa</p></div>
          </div>
          <div className="segunda-informacion-nombre">
            <div className="input">
              {dataCliente?.map((item,index) => (
                <p key={index} className="custom-input">{item.nombre}</p>
              )) || <p className="custom-input"></p>}
            </div>
            <div className="texto-input"><p>Nombre</p></div>
          </div>
          <div className="segunda-informacion">
            <div className="input">
              {dataCliente?.map((item,index) => (
                <p key={index} className="custom-input">{`$ ${item.cupo}`}</p>
              )) || <p className="custom-input"></p>}
            </div>
            <div className="texto-input"><p>Cupo</p></div>
          </div>
          <div className="segunda-informacion">
            <div className="input">
              {dataCliente?.map((item,index) => (
                <p key={index} className="custom-input">{`${item.plazo_dias} días`}</p>
              )) || <p className="custom-input"></p>}
            </div>
            <div className="texto-input"><p>Plazo</p></div>
          </div>
          <div className="segunda-informacion">
            <div className="input">
              {dataCliente?.map((item,index) => (
                <p key={index} className="custom-input">{`$ ${item.cartera}`}</p>
              )) || <p className="custom-input"></p>}
            </div>
            <div className="texto-input"><p>Cartera</p></div>
          </div>
          <div className="segunda-informacion">
            <div className="input">
              {dataCliente?.map((item,index) => (
                <p key={index} className="custom-input">{`$ ${(item.cupo - item.cartera)}`}</p>
              )) || <p className="custom-input"></p>}
            </div>
            <div className="texto-input"><p>Disponible</p></div>
          </div>
        </div>
        <div className="container-segundo-buscador">
          <div className="tercer-informacion-articulo">
            <div className="input">
              <select
                className="custom-select"
                value={selectedArticulo}
                onChange={(e) => {
                  setSelectedArticulo(e.target.value);
                  fetchDataArticulo(e.target.value);
                }}
              >
                <option value="" disabled>Seleccione una opción</option>
                {dataArticulos?.map((item, index) => (
                  <option key={index} value={item.codigo}>{item.codigo}</option>
                ))}
              </select>
            </div>
            <div className="texto-input"><p>Código del artículo</p></div>
          </div>
          <div className="tercer-informacion">
            <div className="input">
              {dataArticulo?.map((item,index) => (
                <p key={index} className="custom-input">{item.nombre}</p>
              )) || <p className="custom-input"></p>}
            </div>
            <div className="texto-input"><p>Nombre del artículo</p></div>
          </div>
          <div className="tercer-informacion">
            <div className="input">
              {dataArticulo?.map((item,index) => (
                <p key={index} className="custom-input">{item.laboratorio}</p>
              )) || <p className="custom-input"></p>}
            </div>
            <div className="texto-input"><p>Laboratorio</p></div>
          </div>
          <div className="tercer-informacion">
            <div className="input">
              <select
                className="custom-select"
                value={naturaleza}
                onChange={(e) => setNaturaleza(e.target.value)}
              >
                <option value="" disabled>Seleccione una opción</option>
                <option value="Positiva (+)">Positiva (+)</option>
                <option value="Negativa (-)">Negativa (-)</option>
              </select>
            </div>
            <div className="texto-input"><p>Naturaleza</p></div>
          </div>
          <div className="tercer-informacion">
            <div className="input">
              {dataArticulo?.map((item,index) => (
                <p key={index} className="custom-input">{`${item.saldo} unidades`}</p>
              )) || <p className="custom-input"></p>}
            </div>
            <div className="texto-input"><p>Saldo</p></div>
          </div>
          <div className="tercer-informacion">
            <div className="input">
              <input
                placeholder="Introducir cantidad"
                type="number"
                className="custom-input-texto"
                value={unidades}
                onChange={(e) => {
                  setUnidades(e.target.value);
                }}
                min="1"
                max={dataArticulo?.[0]?.saldo}
              />
            </div>
            <div className="texto-input"><p>Unidades</p></div>
          </div>
          <div className="tercer-informacion">
            <div className="input">
              {naturaleza === 'Positiva (+)' ? (
                <input
                  placeholder="Introducir costo"
                  type="number"
                  className="custom-input-texto"
                  value={costoUnidad}
                  onChange={(e) => {
                    setCostoUnidad(e.target.value);
                  }}
                  step="0.01"
                  min="0"
                />
              ) : (
                <p className="custom-input">
                  {dataArticulo?.[0] ? `$ ${dataArticulo[0].costo_unidad.toFixed(2)}` : '$ 0.00'}
                </p>
              )}
            </div>
            <div className="texto-input"><p>Costo unidad</p></div>
          </div>
          {naturaleza === 'Negativa (-)' && (
            <div className="tercer-informacion">
              <div className="input">
                <input
                  placeholder="Introducir precio"
                  type="number"
                  className="custom-input-texto"
                  value={precioVenta}
                  onChange={(e) => {
                    setPrecioVenta(e.target.value);
                  }}
                  step="0.01"
                  min={dataArticulo?.[0]?.costo_unidad || 0}
                />
              </div>
              <div className="texto-input"><p>Precio de venta</p></div>
            </div>
          )}
        </div>
        <div className="container-boton">
          <button className="btn-agrgar" onClick={agregarArticulo}>
            <span className="button_top">Agregar</span>
          </button>
        </div>
        {articulosFactura.length > 0 && (
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
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {articulosFactura.map((articulo, index) => (
                    <tr key={index}>
                      <td>{articulo.codigo_articulo}</td>
                      <td>{articulo.nombre_articulo}</td>
                      <td>{articulo.laboratorio}</td>
                      <td>{articulo.naturaleza}</td>
                      <td>{articulo.unidades}</td>
                      <td>{articulo.precio_venta_unitario > 0 ? `$ ${articulo.precio_venta_unitario.toFixed(2)}` : '$ 0.00'}</td>
                      <td>{articulo.costo_unitario > 0 ? `$ ${articulo.costo_unitario.toFixed(2)}` : '$ 0.00'}</td>
                      <td><button onClick={() => eliminarArticulo(index)}>Eliminar</button></td>
                    </tr>
                  ))}
                  <tr className="fila-total">
                    <td colSpan={4}></td>
                    <td>Total</td>
                    <td>$ {articulosFactura.reduce((sum, art) => sum + art.precio_venta_unitario * art.unidades, 0).toFixed(2)}</td>
                    <td>$ {articulosFactura.reduce((sum, art) => sum + art.costo_unitario * art.unidades, 0).toFixed(2)}</td>
                    <td></td>
                  </tr>
                  {articulosFactura.some(art => art.naturaleza.includes('negativa')) && !validarDisponible() && (
                    <tr className="error-message">
                      <td colSpan={8}>El total de artículos con naturaleza negativa excede el disponible del cliente</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="boton-guardar">
        <div className="btn-guardar">
          <button className="btn-agrgar" onClick={handleGuardarFactura}>
            <span className="button_top">Guardar</span>
          </button>
        </div>
          <div style={{ marginTop: '30px', width: '100%' }}>
            {/* Por esto: */}
            <div className="botones-acciones">
              <button
                className="boton-accion"
                onClick={() => navigate('/registrar-cliente')}
                style={{ backgroundColor: '#f0f0f0' }}
              >
                <span className="button_top">Crear Cliente</span>
              </button>
              <button
                className="boton-accion"
                onClick={() => fetchFacturasCliente(selectedCliente)}
                disabled={!selectedCliente}
                style={{ opacity: !selectedCliente ? 0.5 : 1 }}
              >
                <span className="button_top">Ver Facturas</span>
              </button>
            </div>
              <div className="contenedor-tabla-responsive">
                {loading && <p style={{ textAlign: 'center', color: '#666' }}>Cargando facturas...</p>}

                {facturas.length > 0 ? (
                  <div className="contenedor-scroll-tabla">
                    <table className="tabla-facturas">
                      <thead>
                        <tr>
                          <th>Número</th>
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
                                onClick={() => handleVerFactura(factura.numero)}
                              >
                                Ver Ahora
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  !loading && selectedCliente && (
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
                      No se encontraron facturas para este cliente
                    </p>
                  )
                )}
              </div>
          </div>
      </div>
      {showError && (
        <div className="error-message-container">
          <div className="error-message-content">
            {errorMessage}
          </div>
        </div>
      )}
    </>
  );
}

export default FacturaDetalle;