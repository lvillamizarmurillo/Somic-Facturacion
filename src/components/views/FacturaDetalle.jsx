import "../../css/facturaDetalle.css"

function FacturaDetalle(){
    return(
        <>
            <div className="container">
                <div className="titulo-container">
                    <h3>FACTURA SIMIC</h3>
                </div>
                <div className="datos-factura">
                    <div className="primera-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">FE2065221484</p>
                        </div>
                        <div className="texto-input">
                            <p>Número de factura</p>
                        </div>
                    </div>
                    <div className="primera-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">03-05-2025</p>                        
                        </div>
                        <div className="texto-input">
                            <p>Fecha de emisión</p>
                        </div>
                    </div>
                    <div className="primera-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">21-06-2025</p>
                        </div>
                        <div className="texto-input">
                            <p>Fecha de vencimiento</p>
                        </div>
                    </div>
                </div>
                <div className="container-primer-buscador">
                    <div className="segunda-informacion-nit">
                        <div className="input">
                            <select className="custom-select">
                                <option value="" disabled selected>Seleccione una opción</option>
                                <option value="1">123</option>
                                <option value="2">987</option>
                                <option value="3">432</option>
                            </select>
                        </div>
                        <div className="texto-input">
                            <p>Nit Empresa</p>
                        </div>
                    </div>
                    <div className="segunda-informacion-nombre">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">Mediclinicos</p>
                        </div>
                        <div className="texto-input">
                            <p>Nombre</p>
                        </div>
                    </div>
                    <div className="segunda-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">$ 120.000</p>
                        </div>
                        <div className="texto-input">
                            <p>Cupo</p>
                        </div>
                    </div>
                    <div className="segunda-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">30 días</p>
                        </div>
                        <div className="texto-input">
                            <p>Plazo</p>
                        </div>
                    </div>
                    <div className="segunda-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">$ 40.000</p>
                        </div>
                        <div className="texto-input">
                            <p>Cartera</p>
                        </div>
                    </div>
                    <div className="segunda-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">$ 80.000</p>
                        </div>
                        <div className="texto-input">
                            <p>Disponible</p>
                        </div>
                    </div>
                </div>
                <div className="container-segundo-buscador">
                    <div className="tercer-informacion-articulo">
                        <div className="input">
                            <select className="custom-select">
                                <option value="" disabled selected>Seleccione una opción</option>
                                <option value="1">123</option>
                                <option value="2">987</option>
                                <option value="3">432</option>
                            </select>
                        </div>
                        <div className="texto-input">
                            <p>Código del artículo</p>
                        </div>
                    </div>
                    <div className="tercer-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">Acetamenofen</p>
                        </div>
                        <div className="texto-input">
                            <p>Nombre del artículo</p>
                        </div>
                    </div>
                    <div className="tercer-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">Medicina General</p>
                        </div>
                        <div className="texto-input">
                            <p>Laboratorio</p>
                        </div>
                    </div>
                    <div className="tercer-informacion">
                        <div className="input">
                            <select className="custom-select">
                                <option value="" disabled selected>Seleccione una opción</option>
                                <option value="1">Positivaa (+)</option>
                                <option value="2">Negativa (-)</option>
                            </select>
                        </div>
                        <div className="texto-input">
                            <p>Naturaleza</p>
                        </div>
                    </div>
                    <div className="tercer-informacion">
                        <div className="input">
                            <p placeholder="NAME" type="text" name="text" class="custom-input">150</p>
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
                            <p placeholder="NAME" type="text" name="text" class="custom-input">$ 4.500</p>
                        </div>
                        <div className="texto-input">
                            <p>Costo unidad</p>
                        </div>
                    </div>
                    <div className="tercer-informacion">
                        <div className="input">
                            <input placeholder="Introducir precio" type="number" name="text" class="custom-input-texto" />
                        </div>
                        <div className="texto-input">
                            <p>Precio de venta</p>
                        </div>
                    </div>
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