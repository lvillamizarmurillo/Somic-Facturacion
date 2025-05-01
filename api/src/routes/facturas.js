import { Router } from "express";
import Facturas from "../services/facturas.js";
import { validationGet } from "../middleware/validationGet.js";

const routerFacturas = Router();

routerFacturas.get('/', Facturas.getFacturas, validationGet())

routerFacturas.get('/kardex', Facturas.getFacturasKardex, validationGet())

routerFacturas.get('/:id', Facturas.getFacturasNit, validationGet())

routerFacturas.get('/kardex/:idFactura', Facturas.getFacturasKardexNit, validationGet())

routerFacturas.get('/kardex/positiva/:idFactura', Facturas.getFacturasKardexNitPositiva, validationGet())

routerFacturas.get('/kardex/negativa:idFactura', Facturas.getFacturasKardexNitNegativa, validationGet())

routerFacturas.post('/', Facturas.postFactura)

export {
    routerFacturas
}