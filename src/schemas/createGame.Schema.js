import joi from "joi"

export const createGameSchema = joi.object({
  name: joi.string().required().min(2),
  image: joi.string().required(),
  stockTotal: joi.number().min(1).required(),
  pricePerDay: joi.number().min(1).required(),
})


