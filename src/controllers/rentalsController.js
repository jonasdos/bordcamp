import { findCustomerByIdService } from "../services/customers.service.js"
import { findGameByIdService } from "../services/games.service.js"
import newRentalValidateBody from "../middlewares/newRentalValidateBody.js"
import { deleteRentalService, findAllRentalsService, newRentalService, returnRentService, verifyRentalService } from "../services/rentals.service.js"

export async function createRental(req, res) {
  const customer = await findCustomerByIdService(req.body.customerId)
  const game = await findGameByIdService(req.body.gameId)
  if (!customer.length > 0 || !game.length > 0) {
    throw {
      type: "Not Found",
      message: "Não foi possivel encontrar o jogo ou o Cliente na base de dados"
    }
  }
  const rental = {
    customerId: req.body.customerId,
    gameId: req.body.gameId,
    rentDate: new Date().toISOString().split('T')[0],
    daysRented: req.body.daysRented,
    returnDate: null,
    originalPrice: game[0].pricePerDay * req.body.daysRented,
    delayFee: null
  }
  if (game[0].stockTotal == 0) {
    throw {
      type: "Indisponibilidade",
      message: "Jogo indisponível"
    }
  }
  await newRentalService(rental)
  return res.status(201).send("Aluguel concluído com sucesso")
}
export async function returnRental(req, res) {
  const rental = await verifyRentalService(req.params.id)
  await returnRentService(rental)
  return res.status(200).send("Aluguel finalizado com sucesso")
}
export async function findAllRentals(req, res) {
  const resultado = await findAllRentalsService()

  const rentals = resultado.map(rental => ({
    id: rental.id,
    customerId: rental.customerId,
    gameId: rental.gameId,
    rentDate: new Date(rental.rentDate).toISOString().split("T")[0],
    daysRented: rental.daysRented,
    returnDate: rental.returnDate === null ? null : new Date(rental.returnDate).toISOString().split("T")[0],
    originalPrice: rental.originalPrice,
    delayFee: rental.delayFee,
    customer: {
      id: rental.customerId,
      name: rental.customerName
    },
    game: {
      id: rental.gameId,
      name: rental.gameName
    }
  }))

  res.status(200).send(rentals)
}

export async function deleteRental(req, res) {
  await deleteRentalService(req.params.id)
  return res.status(200).send('Aluguel deletado com sucesso')

}