import { Router } from "express";
import Articulos from "../services/articulos.js";

const routerArticulos = Router();

routerArticulos.get('/', Articulos.getCodigoArticulo)

routerArticulos.get('/:codigo', Articulos.getArticulo)

export {
    routerArticulos
}