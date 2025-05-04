export const validationGet = ()=>{
    return async (req,res)=>{
        const data = res.locals.result;
        if (data.length === 0){
            return res.status(404).json({status: 404, message: "No se encontró ningún dato en la búsqueda"})
        }else{
            return res.status(200).json({status: 200, message: data})
        }
    } 
}