import db from '../config/connectMongo.js';

const clientes = db.getInstancia().elegirColeccion('clientes').conectar();

export default class Cliente {
    static async getClientes(req,res,next){
        try {
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
            res.locals.result = result;
            next();
        } catch (error) {
            next(error)
        }
    }

    static async getCliente(req,res,next){
        try {
            const result = await clientes.aggregate([
                {
                    $match: {documento: req.params.id}
                }
            ]).toArray();
            res.locals.result = result;
            next();
        } catch (error) {
            next(error)
        }
        
        
    }
    
}