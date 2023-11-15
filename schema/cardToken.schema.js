const Joi = require('joi');

//Para validar el año, los ultimos 5
const currentYear = new Date().getFullYear();

const cardSchema = Joi.object({
  email: Joi.string().min(13).max(16).required().messages({
    'string.base': `email debe ser de tipo 'texto'`,
    'string.empty': `El campo email no debe estar vacío`,
    'string.max': `email debe tener 16 caracteres como máximo`,
    'string.min': `email debe tener 13 caracteres como mínimo`,
    'any.required': `El campo email es requerido | Array: userData`,
    'string.email': `El campo email debe ser un email válido`
  }),
  card_number: Joi.string().pattern(/^\d+$/).length(16).required().messages({
    'string.base': `card_number debe ser de tipo 'texto'`,
    'string.empty': `El card_number email no debe estar vacío`,
    'string.max': `card_number debe tener 16 caracteres como máximo`,
    'string.min': `card_number debe tener 13 caracteres como mínimo`,
    'any.required': `El campo card_number es requerido `
  }),
  cvv: Joi.string().min(3).max(4).required().messages({
    'string.base': `cvv debe ser de tipo 'texto'`,
    'string.empty': `El cvv  no debe estar vacío`,
    'string.min': `cvv debe tener 3 caracteres como minimo`,
    'string.max': `cvv debe tener 4 caracteres como maximo`,
    'any.required': `El campo cvv es requerido `
  }),
  expiration_month: Joi.number().integer().min(1).max(12).required().messages({
    'number.base': `expiration_month debe ser de tipo 'numerico'`,
    'number.empty': `El expiration_month  no debe estar vacío`,
    'number.min': `expiration_month debe tener minimo el 1 como valor`,
    'number.max': `expiration_month debe tener maximo el 12 como valor`,
    'any.required': `El campo expiration_month es requerido `
  }),
  expiration_year: Joi.number().integer().min(currentYear).max(currentYear + 5).required().messages({
    'number.base': `expiration_year debe ser de tipo 'numerico'`,
    'number.empty': `El expiration_year  no debe estar vacío`,
    'number.max': `expiration_year debe tener maximo 5 años`,
    'any.required': `El campo expiration_year es requerido `
  }),
}).options({ abortEarly: false });

//const validateCard = cardSchema.validate(data);

const luhnCheck = (cardNumber) => {
    const digits = cardNumber.split('').map(Number);
  
    for (let i = digits.length - 2; i >= 0; i -= 2) {
      let digit = digits[i] * 2;
      if (digit > 9) {
        digit -= 9;
      }
      digits[i] = digit;
    }
  
    const sum = digits.reduce((acc, val) => acc + val, 0);
    return sum % 10 === 0;
};

module.exports = {
    cardSchema,
    luhnCheck
}
