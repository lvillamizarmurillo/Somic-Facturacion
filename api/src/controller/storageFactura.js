import Joi from "joi";

class ValidationsFactura {
    static articuloSchema = Joi.object({
        numero_factura: Joi.string().max(20).required().messages({
            'string.base': 'El número de factura debe ser un texto',
            'string.empty': 'El número de factura no puede estar vacío',
            'string.max': 'El número de factura no puede exceder los {#limit} caracteres',
            'any.required': 'El número de factura es obligatorio'
        }),
        codigo_articulo: Joi.string().max(20).required().messages({
            'string.base': 'El código de artículo debe ser un texto',
            'string.empty': 'El código de artículo no puede estar vacío',
            'string.max': 'El código de artículo no puede exceder los {#limit} caracteres',
            'any.required': 'El código de artículo es obligatorio'
        }),
        nombre_articulo: Joi.string().max(100).required().messages({
            'string.base': 'El nombre de artículo debe ser un texto',
            'string.empty': 'El nombre de artículo no puede estar vacío',
            'string.max': 'El nombre de artículo no puede exceder los {#limit} caracteres',
            'any.required': 'El nombre de artículo es obligatorio'
        }),
        naturaleza: Joi.string().valid('negativa (-)', 'positiva (+)').required().messages({
            'string.base': 'La naturaleza debe ser un texto',
            'string.empty': 'La naturaleza no puede estar vacía',
            'any.only': 'La naturaleza debe ser "negativa (-)" o "positiva (+)"',
            'any.required': 'La naturaleza es obligatoria'
        }),
        unidades: Joi.number().integer().min(1).required().messages({
            'number.base': 'Las unidades deben ser un número',
            'number.integer': 'Las unidades deben ser un número entero',
            'number.min': 'Las unidades deben ser al menos 1',
            'any.required': 'Las unidades son obligatorias'
        }),
        precio_venta_unitario: Joi.when('naturaleza', {
            is: 'negativa (-)',
            then: Joi.number().precision(2).positive().required().messages({
                'number.base': 'El precio de venta debe ser un número',
                'number.precision': 'El precio de venta debe tener máximo 2 decimales',
                'number.positive': 'El precio de venta debe ser positivo',
                'any.required': 'El precio de venta es obligatorio para naturaleza negativa'
            }),
            otherwise: Joi.forbidden().messages({
                'any.unknown': 'El precio de venta no está permitido para naturaleza positiva'
            })
        }),
        costo_unitario: Joi.when('naturaleza', {
            is: 'positiva (+)',
            then: Joi.number().precision(2).positive().required().messages({
                'number.base': 'El costo unitario debe ser un número',
                'number.precision': 'El costo unitario debe tener máximo 2 decimales',
                'number.positive': 'El costo unitario debe ser positivo',
                'any.required': 'El costo unitario es obligatorio para naturaleza positiva'
            }),
            otherwise: Joi.forbidden().messages({
                'any.unknown': 'El costo unitario no está permitido para naturaleza negativa'
            })
        })
    }).strict(); 

    static postFactura = Joi.object({
        factura: Joi.object({
            numero: Joi.string().max(20).required().messages({
                'string.base': 'El número de factura debe ser un texto',
                'string.empty': 'El número de factura no puede estar vacío',
                'string.max': 'El número de factura no puede exceder los {#limit} caracteres',
                'any.required': 'El número de factura es obligatorio'
            }),
            nit_cliente: Joi.string().max(20).required().messages({
                'string.base': 'El NIT del cliente debe ser un texto',
                'string.empty': 'El NIT del cliente no puede estar vacío',
                'string.max': 'El NIT del cliente no puede exceder los {#limit} caracteres',
                'any.required': 'El NIT del cliente es obligatorio'
            })
        }).strict().required().messages({
            'object.base': 'El campo factura debe ser un objeto',
            'any.required': 'El campo factura es obligatorio'
        }),
        articulos: Joi.array().min(1).items(ValidationsFactura.articuloSchema).required().messages({
            'array.base': 'Los artículos deben ser un arreglo',
            'array.min': 'Debe haber al menos un artículo',
            'any.required': 'Los artículos son obligatorios'
        }),
        plazo_dias: Joi.number().integer().min(0).required().messages({
            'number.base': 'El plazo en días debe ser un número',
            'number.integer': 'El plazo en días debe ser un entero',
            'number.min': 'El plazo en días no puede ser negativo',
            'any.required': 'El plazo en días es obligatorio'
        }),
        cartera: Joi.number().precision(2).required().messages({
            'number.base': 'La cartera debe ser un número',
            'number.precision': 'La cartera debe tener máximo 2 decimales',
            'any.required': 'La cartera es obligatoria'
        })
    }).strict(); 

    static validateFactura(data) {
        return ValidationsFactura.postFactura.validate(data, { 
            abortEarly: false,
            allowUnknown: false
        });
    }
}

export default ValidationsFactura;