import rentalsSchemas from "../schemas/createRental.Schema.js";

export default function newRentalValidate(req, res, next) {
  const reqValidateData = rentalsSchemas.createRentalSchema.validate(req.body, { abortEarly: false })
  if (reqValidateData.error) {
    const erros = reqValidateData.error.details.map((detail) => detail.message)
    return res.status(400).send(erros)
  }

  next()
}

