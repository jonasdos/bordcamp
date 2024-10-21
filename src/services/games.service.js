import gamesRepository from "../repositories/games.repository.js"

export async function getAllGamesService() {
  const resultado = await gamesRepository.findAll()
  return resultado
}
export async function verifyGameNameService(name) {
  const resultado = await gamesRepository.verifyGameName(name)
  return resultado
}
export async function createGameService({ name, image, stockTotal, pricePerDay }) {

  const resultado = await gamesRepository.create({ name, image, stockTotal, pricePerDay })
  return resultado
}
