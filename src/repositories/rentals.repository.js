import db from '../database/db.connection.js'


async function create(rental) {

  try {
    await db.query(
      `
    insert into rentals ("customerId", "gameId", "rentDate","daysRented", "returnDate", "originalPrice","delayFee")
    values ($1,$2,$3,$4,$5,$6,$7)
    `, [rental.customerId, rental.gameId, rental.rentDate, rental.daysRented, rental.returnDate, rental.originalPrice, rental.delayFee])
    await db.query(` update games
    set "stockTotal" = "stockTotal" - 1
    where id = $1`, [rental.gameId])
    return true
  }
  catch (error) {
    console.log(error)
    return false
  }
}
async function findAllRentalsRepository() {
  const resultado = await db.query(`
    SELECT 
  rentals.id,
  rentals."customerId",
  rentals."gameId",
  rentals."rentDate",
  rentals."daysRented",
  rentals."returnDate",
  rentals."originalPrice",
  rentals."delayFee",
  customers.id AS "customerId",
  customers.name AS "customerName",
  games.id AS "gameId",
  games.name AS "gameName"
FROM rentals
JOIN customers ON rentals."customerId" = customers.id
JOIN games ON rentals."gameId" = games.id;`)
  return resultado.rows
}
async function verifyRentalRepository(id) {
  const resultado = await db.query(`select * from rentals where id = $1`, [id])

  return resultado.rows[0]
}
async function returnRent(rental) {
  let dataAtual = new Date().toISOString().split("T")[0]
  let dataAluguel = new Date(rental.rentDate)
  let dataPrevista = new Date(dataAluguel)
  dataPrevista.setDate(dataAluguel.getDate() + rental.daysRented)
  dataPrevista = new Date(dataPrevista).toISOString().split("T")[0]
  let delayFee = ((new Date(dataAtual) - new Date(dataPrevista)) / (1000 * 60 * 60 * 24)) * (rental.originalPrice / rental.daysRented)

  if (delayFee < 0) {
    delayFee = 0
  }

  try {
    await db.query(`update rentals
    set "returnDate" = $1,"delayFee" = $3
    where id = $2`, [dataAtual, rental.id, delayFee])
    await db.query(`
      update games
      set "stockTotal" = "stockTotal"+1
      where id = $1
      `, [rental.gameId])
    return true
  }
  catch (error) {
    console.log(error)
    return false
  }

}
async function deleteRental(id) {
  await db.query(`delete from rentals where id = $1`, [id])

  return true
}

const rentalsRepository = {
  create, verifyRentalRepository, returnRent, findAllRentalsRepository, deleteRental
}
export default rentalsRepository