import { Router } from "express";
import Cliente from "../services/clientes.js";
import { validationGet } from "../middleware/validationGet.js";

const routerCliente = Router();

routerCliente.get('/', Cliente.getClientes, validationGet());

routerCliente.get('/:id', Cliente.getCliente, validationGet());

export{
    routerCliente
}