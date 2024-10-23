import { Router } from "express"
import newRentalValidate from "../middlewares/newRentalValidade.js"
import { createRental } from "../controllers/rentalsController.js"
const rentalsRouter = Router()

rentalsRouter.post("/rentals", newRentalValidate, createRental)

export default rentalsRouter