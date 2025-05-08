import { Router } from "express";
import Articulos from "../services/articulos.js";
import { validationGet } from "../middleware/validationGet.js";

const routerArticulos = Router();

routerArticulos.get('/', Articulos.getCodigoArticulo, validationGet())

routerArticulos.get('/:codigo', Articulos.getArticulo, validationGet())

routerArticulos.post('/', Articulos.postArticulo)

export {
    routerArticulos
}