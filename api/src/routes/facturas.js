import { Router } from "express";
import Facturas from "../services/facturas.js";
import { validationGet } from "../middleware/validationGet.js";

const routerFacturas = Router();

routerFacturas.get('/', Facturas.getFacturas, validationGet())

routerFacturas.get('/:id', Facturas.getFacturasNit, validationGet())

routerFacturas.get('/completa/:factura', Facturas.getFacturaCompleta)

routerFacturas.post('/', Facturas.postFactura)

export {
    routerFacturas
}