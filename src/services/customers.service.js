import customersRepository from "../repositories/customers.repository.js"

export async function getAllCustomersService() {
  const resultado = await customersRepository.findAll()
  return resultado
}
export async function verifyCustomersCpfService(cpf) {
  const resultado = await customersRepository.verifyCustomerCpf(cpf)
  return resultado
}
export async function createCustomersService({ name, phone, cpf }) {
  const resultado = await customersRepository.create({ name, phone, cpf })
  return resultado
}
export async function findCustomerByIdService(id) {
  const resultado = await customersRepository.findById(id)
  return resultado
}
