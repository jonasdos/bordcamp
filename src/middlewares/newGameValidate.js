import { createGameSchema } from "../schemas/createGame.Schema.js"

export default function newGameValidate(req, res, next) {
  const validaGameData = createGameSchema.validate(req.body, { abortEarly: false })
  if (validaGameData.error) {
    const erros = validaGameData.error.details.map((detail) => detail.message)
    return res.status(400).send(erros)
  }

  next()
}