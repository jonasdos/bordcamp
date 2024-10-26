import { createCustomersService, getAllCustomersService, verifyCustomersCpfService, findCustomerByIdService } from "../services/customers.service.js";

export async function createCustomer(req, res) {
  await verifyCustomersCpfService(req.body.cpf)
  await createCustomersService(req.body)
  return res.status(201).send("Cliente cadastrado com sucesso")
}
export async function getCustomerbyId(req, res) {
  const customer = await findCustomerByIdService(req.params.id)
  return res.status(200).send(customer)
}
export async function getCustomers(req, res) {
  const resultado = await getAllCustomersService()
  return res.status(200).send(resultado)
}