import db from '../config/connectMongo.js';
import ValidationsCliente from '../controller/storageCliente.js';

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

    static async postCliente(req,res){
        try {            
            const { error } = ValidationsCliente.validateCliente(req.body)

            if (error) return res.status(400).send({ status: 400, message: error.details.map(err => err.message).join('. ') });

            req.body.cartera = 0;
            await clientes.insertOne(req.body);
            return res.status(200).json({status: 200, message: "El cliente se guardó correctamente"})
        } catch (error) {
            return res.status(400).json({status: 400, message: error})
        }
    }
    
}