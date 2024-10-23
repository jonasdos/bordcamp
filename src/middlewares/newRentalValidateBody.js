import rentalsSchemas from "../schemas/createRental.Schema.js"

export default function newRentalValidateBody(rental) {
  const rentalValidateData = rentalsSchemas.rentalSchema.validate(rental, { abortEarly: false })
  if (rentalValidateData.error) {
    const erros = rentalValidateData.error.details.map((detail) => detail.message)
    return res.status(400).send(erros)
  }
  return true
}

