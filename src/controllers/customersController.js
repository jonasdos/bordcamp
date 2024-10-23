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

async function getCustomers(req, res) {
  if (req.params.id) {
    console.log("Rota com parametro")
    const customer = await findCustomerByIdService(req.params.id)
    if (customer.length > 0) {
      return res.status(200).send(customer)
    } else {
      return res.status(404).send("Id não encontrado")
    }
  }
  console.log("Rota sem parametro")
  const resultado = await getAllCustomersService()
  return res.status(200).send(resultado)

}


const customersControllers = { createCustomer, getCustomers }
export default customersControllers