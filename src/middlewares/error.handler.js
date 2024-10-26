
export default function errorHandler(error, req, res, next) {
  console.log(error)
  if (error.type === "Conflict") return res.status(409).send(error.message)
  if (error.type === "Not Found") return res.status(404).send(error.message)
  if (error.type === "Erro ao criar usuário") return res.status(400).send(error.message)
  if (error.type === "Indisponibilidade") return res.status(422).send(error.message)
  return res.status(500).send("Erro desconhecido")
}