import db from '../config/connectMongo.js'
import ValidationsFactura from '../controller/storageFactura.js';
import { calcularFechaVencimiento, procesarArticuloNegativo, procesarArticuloPositivo } from '../helpers/facturaHelpers.js';

const facturas = db.getInstancia().elegirColeccion('factura').conectar();
const facturakardex = db.getInstancia().elegirColeccion('facturakardex').conectar();
const articulos_consulta = db.getInstancia().elegirColeccion('articulos').conectar();
const clientes = db.getInstancia().elegirColeccion('clientes').conectar();

export default class Facturas {
    static async getFacturas(req,res,next){
        try {
            const result = await facturas.aggregate([
                {
                    $match: {}
                }
            ]).toArray();
            res.locals.result = result;
            next();
        } catch (error) {
            next(error)
        }
    }

    static async getFacturasKardex(req,res,next){
        try {
            const result = await facturakardex.aggregate([
                {
                    $match: {}
                }
            ]).toArray();
            res.locals.result = result;
            next();
        } catch (error) {
            next(error)
        }
    }

    static async getFacturasNit(req,res,next){
        try {
            const result = await facturas.aggregate([
                {
                    $match: {nit_cliente: req.params.id}
                }
            ]).toArray();
            res.locals.result = result;
            next();
        } catch (error) {
            next(error)
        }
    }

    static async getFacturasKardexNit(req,res,next){
        try {
            const result = await facturakardex.aggregate([
                {
                    $match: {numero_factura: req.params.idFactura}
                }
            ]).toArray();
            res.locals.result = result;
            next();
        } catch (error) {
            next(error)
        }
    }

    static async getFacturasKardexNitPositiva(req,res,next){
        try {
            const result = await facturakardex.aggregate([
                {
                    $match: {
                        numero_factura: req.params.idFactura,
                        naturaleza: "positiva (+)"
                    }
                }
            ]).toArray();
            res.locals.result = result;
            next();
        } catch (error) {
            next(error)
        }
    }

    static async getFacturasKardexNitNegativa(req,res,next){
        try {
            const result = await facturakardex.aggregate([
                {
                    $match: {
                        numero_factura: req.params.idFactura,
                        naturaleza: "negativa (-)"
                    }
                }
            ]).toArray();
            res.locals.result = result;
            next();
        } catch (error) {
            next(error)
        }
    }

    static async postFactura(req, res) {
        try {
            const { error } = ValidationsFactura.validateFactura(req.body)

            if (error) return res.status(400).send({ status: 400, message: error.details.map(err => err.message).join('. ') });

            const { articulos, factura: facturaData, plazo_dias, cartera } = req.body;
            
            // Inicialización de la factura
            const factura = {
            ...facturaData,
            fecha: new Date(),
            fecha_vencimiento: calcularFechaVencimiento(new Date(), plazo_dias || 0),
            total_Venta: 0,
            total_Costo: 0,
            estado: "pendiente"
            };
        
            // Procesamiento de artículos
            for (const articulo of articulos) {
            const infoArticulo = await articulos_consulta.findOne({
                codigo: articulo.codigo_articulo
            });
        
            let resultados;
            if (articulo.naturaleza === "negativa (-)") {
                resultados = await procesarArticuloNegativo(articulo, infoArticulo);
            } else {
                resultados = await procesarArticuloPositivo(articulo, infoArticulo);
            }
        
            articulo.subtotal_venta = resultados.subtotal_venta;
            articulo.subtotal_costo = resultados.subtotal_costo;
            factura.total_Venta += resultados.subtotal_venta;
            factura.total_Costo += resultados.subtotal_costo;
            }
        
            // Actualización de cliente
            await clientes.updateOne(
            { documento: factura.nit_cliente },
            { $set: { cartera: cartera + factura.total_Venta } }
            );
        
            // Guardado en base de datos
            await Promise.all([
            facturakardex.insertMany(articulos),
            facturas.insertOne(factura)
            ]);
        
            res.status(200).json({ status: "200", message: "Se guardó correctamente." });
        } catch (error) {
            console.error("Error al procesar factura:", error);
            res.status(500).json({
            status: "500",
            message: error.message || "Error al procesar la factura"
            });
        }
    }

}