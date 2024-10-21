
export default function errorHandler(error, req, res, next) {
  console.log(error)
  if (error.type === 'dadosFodidos') {

    return res.status(400).send(error)
  }

  return res.status(500).send('Erro desconhecido')
}