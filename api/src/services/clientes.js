export default class Cliente {
    static async getHolaMundo(req,res){
        res.status(200).json({status: "200", message: "Hola mundo"})
    }
}