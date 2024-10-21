import { createCustomerSchema } from "../schemas/createCustomer.Schema.js"

export default function newCustomerValidate(req, res, next) {
  const validaCustomerData = createCustomerSchema.validate(req.body, { abortEarly: false })
  if (validaCustomerData.error) {
    const erros = validaCustomerData.error.details.map((detail) => detail.message)
    return res.status(400).send(erros)
  }

  next()
}