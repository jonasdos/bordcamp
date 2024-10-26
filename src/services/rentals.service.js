import rentalsRepository from "../repositories/rentals.repository.js";

export async function newRentalService(rental) {
  const resultado = await rentalsRepository.create(rental)
  return resultado
}
export async function verifyRentalService(id) {
  const resultado = await rentalsRepository.verifyRentalRepository(id)
  if (resultado === undefined || resultado.length === 0) {
    throw {
      type: "Not Found",
      message: "Aluguel não encontrado"
    }
  }
  if (resultado.returnDate != null) {
    throw {
      type: "Indisponibilidade",
      message: "Aluguel já finalizado"
    }
  }
  return resultado
}
export async function returnRentService(rental) {
  const resultado = await rentalsRepository.returnRent(rental)
  return resultado
}
export async function findAllRentalsService() {
  const resultado = await rentalsRepository.findAllRentalsRepository()
  if (resultado === null || resultado.length === 0) {
    throw {
      type: "Not Found",
      Message: "Ainda não há alugueis cadastrados"
    }
  }
  return resultado
}
export async function deleteRentalService(id) {
  const resultado = await rentalsRepository.verifyRentalRepository(id)
  if (resultado === undefined || resultado.length === 0) {
    throw {
      type: "Not Found",
      message: "Aluguel não encontrado"
    }
  }
  if (resultado.returnDate === null) {
    throw {
      type: "Indisponibilidade",
      message: "Aluguel precisa ser dado baixa para ser deletado"
    }
  }
  await rentalsRepository.deleteRental(id)
  return resultado
}