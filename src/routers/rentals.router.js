import { Router } from "express"
import newRentalValidate from "../middlewares/newRentalValidade.js"
import { createRental, returnRental, findAllRentals, deleteRental } from "../controllers/rentalsController.js"
const rentalsRouter = Router()

rentalsRouter.post("/rentals", newRentalValidate, createRental)
rentalsRouter.get("/rentals", findAllRentals)
rentalsRouter.post("/rentals/:id/return", returnRental)
rentalsRouter.delete("/rentals/:id", deleteRental)
export default rentalsRouter