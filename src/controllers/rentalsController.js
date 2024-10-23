import { findCustomerByIdService } from "../services/customers.service.js"
import { findGameByIdService } from "../services/games.service.js"


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
    originalPrice: game[0].pricePerDay,
    delayFee: null
  }
  if (game[0].stockTotal == 0) {
    return res.status(422).send("Jogo indisponível")
  }

  return res.status(200).send("Aluguel concluído com sucesso")
}