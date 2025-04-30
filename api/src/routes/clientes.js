import { Router } from "express";
import Cliente from "../services/clientes.js";

const routerCliente = Router();

routerCliente.get('/', Cliente.getClientes);

export{
    routerCliente
}