import db from '../config/connectMongo.js'
import ValidationsArticulo from '../controller/storageArticulo.js';

const articulos = db.getInstancia().elegirColeccion('articulos').conectar();

export default class Articulos {
    static async getCodigoArticulo(req,res,next){
        try {
            const result = await articulos.aggregate([
                {
                    $match: {}
                },
                {
                    $project: {
                        _id: 0,
                        codigo: 1
                    }
                }
            ]).toArray();
            res.locals.result = result;
            next();
        } catch (error) {
            next(error);
        }
        
    }

    static async getArticulo(req,res,next){
        try {
            const result = await articulos.aggregate([
                {
                    $match: {codigo: req.params.codigo}
                }
            ]).toArray();
            res.locals.result = result;
            next();
        } catch (error) {
            next(error);
        }
    }

    static async postArticulo(req,res){
        try {                
            const { error } = ValidationsArticulo.validateArticulo(req.body);

            if (error) return res.status(400).send({ status: 400, message: error.details.map(err => err.message).join('. ') });

            req.body.precio_venta = req.body.costo_unidad;
            await articulos.insertOne(req.body);
            return res.status(200).json({status: 200, message: "El artículo se guardó correctamente"})
        } catch (error) {
            return res.status(400).json({status: 400, message: error})
        }
    }

}