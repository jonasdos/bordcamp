import db from '../database/db.connection.js'

async function findAll() {
  const gamesList = await db.query(`SELECT * from games`)
  return gamesList.rows
}
async function verifyGameName(name) {
  const resultado = await db.query(`select * from games where name ilike $1`, [name])

  return resultado.rows
}
async function create({ name, image, stockTotal, pricePerDay }) {
  await db.query(
    `insert into games(name, image, "stockTotal", "pricePerDay") values($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]
  )
  const resultado = await findAll()
  return resultado.rows
}

const gamesRepository = {
  verifyGameName, create, findAll
}
export default gamesRepository