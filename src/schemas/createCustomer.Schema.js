import joi from "joi"

export const createCustomerSchema = joi.object({
  name: joi.string().required().min(3),
  phone: joi.string().required().min(11).max(11),
  cpf: joi.string().required().min(11).max(11)

})


