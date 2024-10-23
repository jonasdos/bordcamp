import Joi from 'joi';

const createRentalSchema = Joi.object({
  customerId: Joi.number().integer().positive().required(),
  gameId: Joi.number().integer().positive().required(),
  daysRented: Joi.number().integer().positive().min(1).required()
})
const rentalSchema = Joi.object({

  customerId: Joi.number().integer().positive().required(),
  gameId: Joi.number().integer().positive().required(),
  rentDate: Joi.date().iso().required(),  // Valida como data ISO 8601
  daysRented: Joi.number().integer().positive().min(1).required(),  // Dias alugados devem ser ao menos 1
  returnDate: Joi.date().iso().allow(null),  // Pode ser uma data ou null
  originalPrice: Joi.number().integer().positive().required(),  // Preço em centavos, deve ser um número positivo
  delayFee: Joi.number().integer().positive().allow(null)  // Pode ser null ou um número positivo
});

const rentalsSchemas = { createRentalSchema, rentalSchema }
export default rentalsSchemas;