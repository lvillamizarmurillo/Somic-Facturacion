import db from '../config/connectMongo.js';

const clientes = db.getInstancia().elegirColeccion('clientes').conectar();

export default class Cliente {
    static async getClientes(req,res){
        const result = await clientes.aggregate([
            {
                $match: {}
            },
            {

                $project: {
                    _id: 0,
                    documento: 1
                }
            }
        ]).toArray();
        res.status(200).json({status: "200", message: result})
    }

    static async getCliente(req,res){
        
        const result = await clientes.aggregate([
            {
                $match: {documento: req.params.id}
            }
        ]).toArray();
        res.status(200).json({status: "200", message: result})
    }
    
}