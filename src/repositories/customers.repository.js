import db from '../database/db.connection.js'

async function findAll() {
  const customersList = await db.query(`SELECT * from customers`)
  return customersList.rows
}
async function findById(id) {
  const resultado = await db.query(`select * from customers where id = $1`, [id])

  return resultado.rows
}
async function verifyCustomerCpf(cpf) {
  const resultado = await db.query(`select * from customers where cpf ilike $1`, [cpf])

  return resultado.rows
}
async function create({ name, phone, cpf }) {
  await db.query(
    `insert into customers(name, phone, cpf) values($1, $2, $3)`, [name, phone, cpf]
  )
  const resultado = await findAll()
  return resultado.rows
}

const customersRepository = {
  verifyCustomerCpf, create, findAll, findById
}
export default customersRepository