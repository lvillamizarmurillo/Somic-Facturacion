import Joi from "joi";

class ValidationsCliente {
    static clienteSchema = Joi.object({
        documento: Joi.string().max(20).required().messages({
            'string.base': 'El documento debe ser un texto',
            'string.empty': 'El documento no puede estar vacío',
            'string.max': 'El documento no puede exceder los {#limit} caracteres',
            'any.required': 'El documento es obligatorio'
        }),
        nombre: Joi.string().max(100).required().messages({
            'string.base': 'El nombre debe ser un texto',
            'string.empty': 'El nombre no puede estar vacío',
            'string.max': 'El nombre no puede exceder los {#limit} caracteres',
            'any.required': 'El nombre es obligatorio'
        }),
        cupo: Joi.number().precision(2).positive().required().messages({
            'number.base': 'El cupo debe ser un número',
            'number.precision': 'El cupo debe tener máximo 2 decimales',
            'number.positive': 'El cupo debe ser positivo',
            'any.required': 'El cupo es obligatorio'
        }),
        plazo_dias: Joi.number().integer().min(0).required().messages({
            'number.base': 'El plazo en días debe ser un número',
            'number.integer': 'El plazo en días debe ser un entero',
            'number.min': 'El plazo en días no puede ser negativo',
            'any.required': 'El plazo en días es obligatorio'
        })
    }).strict();

    static validateCliente(data) {
        return ValidationsCliente.clienteSchema.validate(data, { 
            abortEarly: false,
            allowUnknown: false
        });
    }
}

export default ValidationsCliente;