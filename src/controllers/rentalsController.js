import { findCustomerByIdService } from "../services/customers.service.js"
import { findGameByIdService } from "../services/games.service.js"
import newRentalValidateBody from "../middlewares/newRentalValidateBody.js"
import { deleteRentalService, findAllRentalsService, newRentalService, returnRentService, verifyRentalService } from "../services/rentals.service.js"

export async function createRental(req, res) {
  const customer = await findCustomerByIdService(req.body.customerId)
  const game = await findGameByIdService(req.body.gameId)

  if (!customer.length > 0 || !game.length > 0) {
    return res.status(404).send("Não foi possivel encontrar o jogo ou o Cliente na base de dados")
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
    return res.status(422).send("Jogo indisponível")
  }

  const newRentalBody = newRentalValidateBody(rental)

  const createRental = await newRentalService(rental)
  if (createRental) {
    return res.status(201).send("Aluguel concluído com sucesso")
  }
  else {
    return res.status(500).send('Problema desconhecido com a operação')
  }



}
export async function returnRental(req, res) {
  const rentalId = req.params.id
  const rental = await verifyRentalService(rentalId)
  if (rental === undefined || rental.length === 0) {
    return res.status(404).send("Aluguel não encontrado")
  }
  if (rental.returnDate != null) {
    return res.status(422).send('Aluguel já finalizado')
  }

  const aluguel = await returnRentService(rental)

  if (aluguel) {
    return res.status(200).send("Aluguel finalizado com sucesso")
  }
  else {
    return res.status(500).send("Ocorreu um erro inesperado na transação")
  }

}
export async function findAllRentals(req, res) {
  const resultado = await findAllRentalsService()
  if (resultado === null || resultado.length === 0) {
    return res.status(404).send("Ainda não há alugueis cadastrados")
  }
  const rentals = resultado.map(rental => ({
    id: rental.id,
    customerId: rental.customerId,
    gameId: rental.gameId,
    rentDate: new Date(rental.rentDate).toISOString().split("T")[0],
    daysRented: rental.daysRented,
    returnDate: new Date(rental.returnDate).toISOString().split("T")[0],
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
  const resultado = await verifyRentalService(req.params.id)

  if (resultado === undefined || resultado.length === 0) {
    return res.status(404).send('Aluguel não encontrado')
  }
  if (resultado.returnDate === null) {
    return res.status(400).send('Aluguel precisa ser dado baixa para ser deletado')
  }
  const transation = await deleteRentalService(resultado.id)
  return res.status(200).send('Aluguel deletado com sucesso')

}