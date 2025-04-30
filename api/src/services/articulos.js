import db from '../config/connectMongo.js'

const articulos = db.getInstancia().elegirColeccion('articulos').conectar();

export default class Articulos {
    static async getCodigoArticulo(req,res){
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
        res.status(200).json({status: "200", message: result});
    }

    static async getArticulo(req,res){
        const result = await articulos.aggregate([
            {
                $match: {codigo: req.params.codigo}
            }
        ]).toArray();
        res.status(200).json({status: "200", message: result});
    }

}