import express from 'express';
import { loadEnv } from 'vite';
import cors from 'cors';
import { routerCliente } from './src/routes/clientes.js';

const env = loadEnv('development', process.cwd(), 'VITE');
const app = express()
const corsOptions = {
    origin: "*", // Reemplaza con el dominio de tu aplicación frontend
};
const config = {
    hostname: env.VITE_HOSTNAME,
    port: env.VITE_PORT_BACKEND
}

app
    .use(cors(corsOptions))

    .use(express.json())

    .use('/cliente', routerCliente)

    .listen(config, ()=>{
        console.log(`http://${config.hostname}:${config.port}`);
    })