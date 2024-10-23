import rentalsRepository from "../repositories/rentals.repository.js";

export async function newRentalService(rental) {
  const resultado = await rentalsRepository.create(rental)
  return resultado
}
export async function verifyRentalService(id) {
  const resultado = await rentalsRepository.verifyRentalRepository(id)
  return resultado
}
export async function returnRentService(rental) {
  const resultado = await rentalsRepository.returnRent(rental)
  return resultado
}
export async function findAllRentalsService() {
  const resultado = await rentalsRepository.findAllRentalsRepository()
  return resultado
}
export async function deleteRentalService(id) {
  const resultado = await rentalsRepository.deleteRental(id)
  return resultado
}