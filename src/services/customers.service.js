import customersRepository from "../repositories/customers.repository.js"

export async function getAllCustomersService() {
  const resultado = await customersRepository.findAll()
  if (resultado.length === 0) {
    throw {
      type: "Not Found",
      message: "Ainda não há usuários cadastrados."
    }
  }
  return resultado
}
export async function verifyCustomersCpfService(cpf) {
  const resultado = await customersRepository.verifyCustomerCpf(cpf)
  if (resultado && resultado.length > 0) {
    throw {
      type: "Conflict",
      message: "já existe um cadastro com esse cpf"
    }
  }
  return resultado
}
export async function createCustomersService({ name, phone, cpf }) {
  const resultado = await customersRepository.create({ name, phone, cpf })
  if (resultado.length === 0) {
    throw {
      type: "Erro ao criar usuário",
      message: "Ocorreu um erro ao cadastrar o cliente no banco de dados"
    }
  }
  return resultado
}
export async function findCustomerByIdService(id) {
  const resultado = await customersRepository.findById(id)
  if (resultado.length === 0) {
    throw {
      type: "Not Found",
      message: "Id não encontrado"
    }

  }
  return resultado
}
