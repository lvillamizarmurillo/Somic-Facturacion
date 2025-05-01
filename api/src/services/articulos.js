import db from '../config/connectMongo.js'

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

}