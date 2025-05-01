import db from '../config/connectMongo.js';

const articulos_consulta = db.getInstancia().elegirColeccion('articulos').conectar();

export const calcularFechaVencimiento = (fecha, plazoDias) => {
    return new Date(fecha.getTime() + plazoDias * 24 * 60 * 60 * 1000);
  };
  
  export const procesarArticuloNegativo = async (articulo, infoArticulo) => {
    const subtotalVenta = articulo.unidades * articulo.precio_venta_unitario;
    const updateData = {
      saldo: infoArticulo.saldo - articulo.unidades
    };
    
    if (articulo.precio_venta_unitario !== infoArticulo.precio_venta) {
      updateData.precio_venta = articulo.precio_venta_unitario;
    }
  
    await articulos_consulta.updateOne(
      { codigo: articulo.codigo_articulo },
      { $set: updateData }
    );
  
    return {
      subtotal_venta: subtotalVenta,
      subtotal_costo: 0
    };
  };
  
  export const procesarArticuloPositivo = async (articulo, infoArticulo) => {
    const subtotalCosto = articulo.unidades * articulo.costo_unitario;
    const updateData = {
      saldo: infoArticulo.saldo + articulo.unidades
    };
    
    if (articulo.costo_unitario !== infoArticulo.costo_unidad) {
      updateData.costo_unidad = articulo.costo_unitario;
    }
  
    await articulos_consulta.updateOne(
      { codigo: articulo.codigo_articulo },
      { $set: updateData }
    );
  
    return {
      subtotal_venta: 0,
      subtotal_costo: subtotalCosto
    };
  };