import "../../css/facturaDetalle.css"
import React, { useState, useEffect } from "react";

const env = {
    VITE_HOSTNAME: import.meta.env.VITE_HOSTNAME,
    PORT_BACKEND: import.meta.env.VITE_PORT_BACKEND
}

function FacturaDetalle(){
    
    const [data, setData] = useState(null);
    const [dataCliente, setDataCliente] = useState(null);
    const [dataArticulo, setDataArticulo] = useState(null);
    const [dataArticulos, setDataArticulos] = useState(null);
    const [costoUnidad, setCostoUnidad] = useState(0);
    const [precioVenta, setPrecioVenta] = useState(0);
    const [numeroAleatorio, setNumeroAleatorio] = useState('');
    const [fechaActual, setFechaActual] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [naturaleza, setNaturaleza] = useState('Positiva(+)');

    const fetchDataClienteNit = async (id) => {
        try {
          const response = await(await fetch(`http://${env.VITE_HOSTNAME}:${env.PORT_BACKEND}/cliente/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
          })).json();
          if(response.status == 200){
            obtenerFechaVencimiento(new Date(), response.message[0].plazo_dias || 0)
            setDataCliente(response.message);
            
          }else{
            console.log(response.message)
          }
        } catch (error) {
          console.error(error);
        }
    }

    const fetchDataArticulo = async (id) => {
        try {
          const response = await(await fetch(`http://${env.VITE_HOSTNAME}:${env.PORT_BACKEND}/articulos/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
          })).json();
          if(response.status == 200){
            console.log(response.message);
            
            setDataArticulo(response.message);
            
          }else{
            console.log(response.message)
          }
        } catch (error) {
          console.error(error);
        }
    }

    const handleCostoChange = (e) => {
        setCostoUnidad(parseFloat(e.target.value));
    };

    const handlePrecioVentaChange = (e) => {
        const nuevoPrecio = parseFloat(e.target.value);
        setPrecioVenta(nuevoPrecio || 0); 
    };

    
    const handleNaturalezaChange = (e) => {
        setNaturaleza(e.target.value);
    };

    const handleCliente = async(e) => {
        fetchDataClienteNit(e.target.value);
    }
    const handleArticulo = async(e) => {
        fetchDataArticulo(e.target.value);
    }

    const obtenerFechaVencimiento = (fecha, plazoDias) => {
        const hoy = new Date(fecha.getTime() + plazoDias * 24 * 60 * 60 * 1000);
        const dia = String(hoy.getDate()).padStart(2, '0');
        const mes = String(hoy.getMonth() + 1).padStart(2, '0'); 
        const año = hoy.getFullYear();
        setFechaVencimiento(`${dia}-${mes}-${año}`);
    };

    useEffect(() => {
        const generarNumero = () => {
            const min = 1000000000;
            const max = 9999999999;
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            setNumeroAleatorio(num.toString());
        };
        const obtenerFechaActual = () => {
            const hoy = new Date();
            const dia = String(hoy.getDate()).padStart(2, '0');
            const mes = String(hoy.getMonth() + 1).padStart(2, '0'); 
            const año = hoy.getFullYear();
            setFechaActual(`${dia}-${mes}-${año}`);
        };
        const fetchDataClientes = async () => {
            try {
              const response = await(await fetch(`http://${env.VITE_HOSTNAME}:${env.PORT_BACKEND}/cliente`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
              })).json();
              if(response.status == 200){
                setData(response.message);
                
              }else{
                console.log(response.message)
              }
            } catch (error) {
              console.error(error);
            }
        }

        const fetchDataarticulos = async () => {
            try {
              const response = await(await fetch(`http://${env.VITE_HOSTNAME}:${env.PORT_BACKEND}/articulos`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
              })).json();
              if(response.status == 200){
                setDataArticulos(response.message);
                
              }else{
                console.log(response.message)
              }
            } catch (error) {
              console.error(error);
            }
        }

        if (dataArticulo && dataArticulo.length > 0) {
            const costo = dataArticulo[0].costo_unidad;
            setCostoUnidad(costo);
            setPrecioVenta(costo); 
        }

        generarNumero();
        obtenerFechaActual();
        fetchDataClientes();
        fetchDataarticulos();
    }, [dataArticulo]);

    return(
        <>
            <div className="container">
                <div className="titulo-container">
                    <h3>FACTURA SIMIC</h3>
                </div>
                <div className="datos-factura">
                    <div className="primera-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">{`FE${numeroAleatorio}`}</p>
                        </div>
                        <div className="texto-input">
                            <p>Número de factura</p>
                        </div>
                    </div>
                    <div className="primera-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">{fechaActual}</p>                        
                        </div>
                        <div className="texto-input">
                            <p>Fecha de emisión</p>
                        </div>
                    </div>
                    <div className="primera-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">{fechaVencimiento}</p>
                        </div>
                        <div className="texto-input">
                            <p>Fecha de vencimiento</p>
                        </div>
                    </div>
                </div>
                <div className="container-primer-buscador">
                    <div className="segunda-informacion-nit">
                        <div className="input">
                            <select className="custom-select" onChange={handleCliente}>
                                <option value="" disabled selected>Seleccione una opción</option>
                                {data != null &&(
                                    data.map((item,index)=>(
                                        <option value={item.documento}>{item.documento}</option>
                                    ))
                                    
                                )}
                            </select>
                        </div>
                        <div className="texto-input">
                            <p>Nit Empresa</p>
                        </div>
                    </div>
                    <div className="segunda-informacion-nombre">
                        <div className="input">
                            {dataCliente != null ? (
                                dataCliente.map((item,index)=>(
                                    <p placeholder="NAME" type="text" name="text" class="custom-input">{item.nombre}</p>
                                ))
                            ) : (
                                <p placeholder="NAME" type="text" name="text" class="custom-input"></p>
                            )};
                        </div>
                        <div className="texto-input">
                            <p>Nombre</p>
                        </div>
                    </div>
                    <div className="segunda-informacion">
                        <div className="input">
                            {dataCliente != null ? (
                                dataCliente.map((item,index)=>(
                                    <p placeholder="NAME" type="text" name="text" class="custom-input">{`$ ${item.cupo}`}</p>
                                ))
                            ) : (
                                <p placeholder="NAME" type="text" name="text" class="custom-input"></p>
                            )};
                        </div>
                        <div className="texto-input">
                            <p>Cupo</p>
                        </div>
                    </div>
                    <div className="segunda-informacion">
                        <div className="input">
                            {dataCliente != null ? (
                                dataCliente.map((item,index)=>(
                                    <p placeholder="NAME" type="text" name="text" class="custom-input">{`${item.plazo_dias} días`}</p>
                                ))
                            ) : (
                                <p placeholder="NAME" type="text" name="text" class="custom-input"></p>
                            )};
                        </div>
                        <div className="texto-input">
                            <p>Plazo</p>
                        </div>
                    </div>
                    <div className="segunda-informacion">
                        <div className="input">
                            {dataCliente != null ? (
                                dataCliente.map((item,index)=>(
                                    <p placeholder="NAME" type="text" name="text" class="custom-input">{`$ ${item.cartera}`}</p>
                                ))
                            ) : (
                                <p placeholder="NAME" type="text" name="text" class="custom-input"></p>
                            )};
                        </div>
                        <div className="texto-input">
                            <p>Cartera</p>
                        </div>
                    </div>
                    <div className="segunda-informacion">
                        <div className="input">
                            {dataCliente != null ? (
                                dataCliente.map((item,index)=>(
                                    <p placeholder="NAME" type="text" name="text" class="custom-input">{`$ ${(item.cupo - item.cartera)}`}</p>
                                ))
                            ) : (
                                <p placeholder="NAME" type="text" name="text" class="custom-input"></p>
                            )};
                        </div>
                        <div className="texto-input">
                            <p>Disponible</p>
                        </div>
                    </div>
                </div>
                <div className="container-segundo-buscador">
                    <div className="tercer-informacion-articulo">
                        <div className="input">
                            <select className="custom-select" onChange={handleArticulo}>
                                <option value="" disabled selected>Seleccione una opción</option>
                                {dataArticulos != null &&(
                                    dataArticulos.map((item,index)=>(
                                        <option value={item.codigo}>{item.codigo}</option>
                                    ))
                                    
                                )}
                            </select>
                        </div>
                        <div className="texto-input">
                            <p>Código del artículo</p>
                        </div>
                    </div>
                    <div className="tercer-informacion">
                        <div className="input">
                            {dataArticulo != null ? (
                                dataArticulo.map((item,index)=>(
                                    <p placeholder="NAME" type="text" name="text" class="custom-input">{item.nombre}</p>
                                ))
                            ) : (
                                <p placeholder="NAME" type="text" name="text" class="custom-input"></p>
                            )};
                        </div>
                        <div className="texto-input">
                            <p>Nombre del artículo</p>
                        </div>
                    </div>
                    <div className="tercer-informacion">
                        <div className="input">
                            {dataArticulo != null ? (
                                dataArticulo.map((item,index)=>(
                                    <p placeholder="NAME" type="text" name="text" class="custom-input">{item.laboratorio}</p>
                                ))
                            ) : (
                                <p placeholder="NAME" type="text" name="text" class="custom-input"></p>
                            )};
                        </div>
                        <div className="texto-input">
                            <p>Laboratorio</p>
                        </div>
                    </div>
                    <div className="tercer-informacion">
                        <div className="input">
                            <select className="custom-select" value={naturaleza} onChange={handleNaturalezaChange}>
                                <option disabled selected>Seleccione una opción</option>
                                <option value="Positiva (+)">Positiva (+)</option>
                                <option value="Negativa (-)">Negativa (-)</option>
                            </select>
                        </div>
                        <div className="texto-input">
                            <p>Naturaleza</p>
                        </div>
                    </div>
                    <div className="tercer-informacion">
                        <div className="input">
                            {dataArticulo != null ? (
                                dataArticulo.map((item,index)=>(
                                    <p placeholder="NAME" type="text" name="text" class="custom-input">{`${item.saldo} unidades`}</p>
                                ))
                            ) : (
                                <p placeholder="NAME" type="text" name="text" class="custom-input"></p>
                            )};
                        </div>
                        <div className="texto-input">
                            <p>Saldo</p>
                        </div>
                    </div>
                    <div className="tercer-informacion">
                        <div className="input">
                            <input placeholder="Introducir cantidad" type="number" name="text" class="custom-input-texto" />
                        </div>
                        <div className="texto-input">
                            <p>Unidades</p>
                        </div>
                    </div>
                    <div className="tercer-informacion">
                    <div className="input">
                        {naturaleza === 'Positiva (+)' ? (
                            <input 
                                placeholder="Introducir costo" 
                                type="number" 
                                name="costo" 
                                className="custom-input-texto" 
                                value={costoUnidad}
                                onChange={handleCostoChange}
                                step="0.01"
                                min="0"
                            />
                        ) : (
                            <p className="custom-input">
                                {dataArticulo && dataArticulo.length > 0 ? `$ ${dataArticulo[0].costo_unidad.toFixed(2)}` : '$ 0.00'}
                            </p>
                        )}
                        </div>
                        <div className="texto-input">
                            <p>Costo unidad</p>
                        </div>
                    </div>

                    {naturaleza === 'Negativa (-)' && (
                        <div className="tercer-informacion">
                            <div className="input">
                                <input 
                                    placeholder="Introducir precio" 
                                    type="number" 
                                    name="precio" 
                                    className="custom-input-texto"
                                    value={precioVenta}
                                    onChange={handlePrecioVentaChange}
                                    step="0.01"
                                    min="0"  // Permite cualquier valor positivo (incluyendo 0)
                                />
                            </div>
                            <div className="texto-input">
                                <p>Precio de venta</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="container-boton">
                    <button className="btn-agrgar">
                        <span className="button_top"> Agregar </span>
                    </button>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>MED-001</td>
                                    <td>Paracetamol 500mg</td>
                                    <td>Genfar</td>
                                    <td>Genérico</td>
                                    <td>100</td>
                                    <td>$12.50</td>
                                    <td>$8.75</td>
                                    <td><button>a</button></td>
                                </tr>
                                <tr>
                                    <td>MED-001</td>
                                    <td>Paracetamol 500mg</td>
                                    <td>Genfar</td>
                                    <td>Genérico</td>
                                    <td>100</td>
                                    <td>$12.50</td>
                                    <td>$8.75</td>
                                    <td><button>a</button></td>
                                </tr>
                                <tr>
                                    <td>MED-001</td>
                                    <td>Paracetamol 500mg</td>
                                    <td>Genfar</td>
                                    <td>Genérico</td>
                                    <td>100</td>
                                    <td>$12.50</td>
                                    <td>$8.75</td>
                                    <td><button>a</button></td>
                                </tr>
                                <tr>
                                    <td>MED-002</td>
                                    <td>Amoxicilina 250mg</td>
                                    <td>Bayer</td>
                                    <td>Original</td>
                                    <td>50</td>
                                    <td>$18.90</td>
                                    <td>$12.30</td>
                                    <td><button>a</button></td>
                                </tr>
                                <tr className="fila-total">
                                    <td colSpan={4}></td> 
                                    <td>Total</td>
                                    <td>$18.90</td>
                                    <td>$12.30</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
            <div className="boton-guardar">
                <div className="btn-guardar">
                    <button className="btn-agrgar">
                        <span className="button_top"> Guardar </span>
                    </button>

                </div>
            </div>
            
        </>
    );
}

export default FacturaDetalle;