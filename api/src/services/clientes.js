import db from '../config/connectMongo.js';

const clientes = db.getInstancia().elegirColeccion('clientes').conectar();

export default class Cliente {
    static async getClientes(req,res){
        const result = await clientes.aggregate([
            {
                $match: {}
            }
        ]).toArray();
        res.status(200).json({status: "200", message: result})
    }
}