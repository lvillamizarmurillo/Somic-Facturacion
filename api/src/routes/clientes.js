import { Router } from "express";
import Cliente from "../services/clientes.js";

const routerCliente = Router();

routerCliente.get('/', Cliente.getClientes);

routerCliente.get('/:id', Cliente.getCliente);

export{
    routerCliente
}