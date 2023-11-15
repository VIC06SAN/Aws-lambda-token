'use strict';
const jwt = require('jsonwebtoken');
const {cardSchema, luhnCheck} = require('./schema/cardToken.schema')

// Función principal del Lambda
module.exports.hello = async (event) => {
  try {
      const { email, card_number, cvv, expiration_year, expiration_month } = JSON.parse(event.body || '{}');
      const { error , value} = cardSchema.validate((JSON.parse(event.body || '{}')));

      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.details[0].message }),
        };
      }
      const isValidLuhn = luhnCheck(value.card_number);
      let validCvv;
      if (cvv.length == 4){
        validCvv = 'Es tarjeta AMEX';
      }else{
        validCvv = 'Es tarjeta VISA / MASTERCARD'
      }

      if (!email || !card_number || !cvv || !expiration_year ||!expiration_month) {
          return {
              statusCode: 400,
              body: JSON.stringify({ error: 'Datos incompletos en la solicitud.' }),
          };
      }
      // Generar el token
      const token = jwt.sign({email, card_number, cvv, expiration_year, expiration_month}, 'secreto', { expiresIn: '15m' });

      if (!isValidLuhn) {
        return{
          statusCode: 400,
          body: JSON.stringify('Numero de tarjeta invalida'),
        }
      }else{
        return {
          statusCode: 200,
          body: JSON.stringify({ response: { token }, mensaje: validCvv}),
        };
      }   
  } catch (error) {
      return {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
      };
  }
};
