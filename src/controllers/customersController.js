import { createCustomersService, getAllCustomersService, verifyCustomersCpfService, findCustomerByIdService } from "../services/customers.service.js";

async function createCustomer(req, res) {
  const customerCPF = req.body.cpf
  const customerExiste = await verifyCustomersCpfService(customerCPF)

  if (customerExiste && customerExiste.length > 0) {
    return res.status(409).send("já existe um cadastro com esse cpf")
  }
  await createCustomersService(req.body)
  return res.status(201).send("Cliente cadastrado com sucesso")
}

async function getAllCustomers(req, res) {
  if (req.params.id) {
    return getCustomersById(req, res)
  }
  console.log(req.params.id)
  const resultado = await getAllCustomersService()
  return res.status(200).send(resultado)
}
async function getCustomersById(req, res) {
  console.log("query")
  const id = req.params.id
  const customer = await findCustomerByIdService(id)
  console.log(customer)
}

const customersControllers = { createCustomer, getAllCustomers, getCustomersById }
export default customersControllers