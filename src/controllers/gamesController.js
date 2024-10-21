import { createGameService, getAllGamesService, verifyGameNameService } from "../services/games.service.js";

async function createGame(req, res) {
  const gameName = req.body.name
  const jogoExiste = await verifyGameNameService(gameName)

  if (jogoExiste && jogoExiste.length > 0) {
    return res.status(409).send("já existe um cadastro com esse nome")
  }
  await createGameService(req.body)
  return res.status(201).send("Jogo cadastrado com sucesso")
}

async function getAllGames(req, res) {
  const resultado = await getAllGamesService()
  return res.status(200).send(resultado)
}


const gamesControllers = { getAllGames, createGame }
export default gamesControllers