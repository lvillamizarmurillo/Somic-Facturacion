import express from 'express';
import { loadEnv } from 'vite';
import cors from 'cors';
import { routerCliente } from './src/routes/clientes.js';
import { routerArticulos } from './src/routes/articulos.js';
import { routerFacturas } from './src/routes/facturas.js';

const env = loadEnv('development', process.cwd(), 'VITE');
const app = express()
const corsOptions = {
    origin: "*",
};
const config = {
    hostname: env.VITE_HOSTNAME,
    port: env.VITE_PORT_BACKEND
}

app
    .use(cors(corsOptions))

    .use(express.json())

    .use('/cliente', routerCliente)

    .use('/articulos', routerArticulos)

    .use('/facturas', routerFacturas)

    .listen(config, ()=>{
        console.log(`http://${config.hostname}:${config.port}`);
    })