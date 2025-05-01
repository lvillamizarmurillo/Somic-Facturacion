import { Router } from "express";
import Facturas from "../services/facturas.js";

const routerFacturas = Router();

routerFacturas.get('/', Facturas.getFacturas)

routerFacturas.get('/kardex', Facturas.getFacturasKardex)

routerFacturas.get('/:id', Facturas.getFacturasNit)

routerFacturas.get('/kardex/:idFactura', Facturas.getFacturasKardexNit)

routerFacturas.get('/kardex/positiva/:idFactura', Facturas.getFacturasKardexNitPositiva)

routerFacturas.get('/kardex/negativa:idFactura', Facturas.getFacturasKardexNitNegativa)

routerFacturas.post('/', Facturas.postFactura)

export {
    routerFacturas
}