import { createGameService, getAllGamesService, verifyGameNameService } from "../services/games.service.js";

async function createGame(req, res) {
  await verifyGameNameService(req.body.name)
  await createGameService(req.body)
  return res.status(201).send("Jogo cadastrado com sucesso")
}

async function getAllGames(req, res) {
  const resultado = await getAllGamesService()
  return res.status(200).send(resultado)
}


const gamesControllers = { getAllGames, createGame }
export default gamesControllers