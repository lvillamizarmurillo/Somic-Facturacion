import Joi from "joi";

class ValidationsArticulo {
    static articuloSchema = Joi.object({
        codigo: Joi.string().max(20).required().messages({
            'string.base': 'El código debe ser un texto',
            'string.empty': 'El código no puede estar vacío',
            'string.max': 'El código no puede exceder los {#limit} caracteres',
            'any.required': 'El código es obligatorio'
        }),
        nombre: Joi.string().max(100).required().messages({
            'string.base': 'El nombre debe ser un texto',
            'string.empty': 'El nombre no puede estar vacío',
            'string.max': 'El nombre no puede exceder los {#limit} caracteres',
            'any.required': 'El nombre es obligatorio'
        }),
        laboratorio: Joi.string().max(100).required().messages({
            'string.base': 'El laboratorio debe ser un texto',
            'string.empty': 'El laboratorio no puede estar vacío',
            'string.max': 'El laboratorio no puede exceder los {#limit} caracteres',
            'any.required': 'El laboratorio es obligatorio'
        }),
        saldo: Joi.number().integer().min(0).required().messages({
            'number.base': 'El saldo debe ser un número',
            'number.integer': 'El saldo debe ser un entero',
            'number.min': 'El saldo no puede ser negativo',
            'any.required': 'El saldo es obligatorio'
        }),
        costo_unidad: Joi.number().precision(2).positive().required().messages({
            'number.base': 'El costo unitario debe ser un número',
            'number.precision': 'El costo unitario debe tener máximo 2 decimales',
            'number.positive': 'El costo unitario debe ser positivo',
            'any.required': 'El costo unitario es obligatorio'
        })
    }).strict();

    static validateArticulo(data) {
        return ValidationsArticulo.articuloSchema.validate(data, { 
            abortEarly: false,
            allowUnknown: false
        });
    }
}

export default ValidationsArticulo;