import { Router } from "express";
import newCustomerValidate from "../middlewares/newCustomerValidate.js"
import { createCustomer, getCustomers, getCustomerbyId } from "../controllers/customersController.js";
const customersRouters = Router()

customersRouters.post("/customers", newCustomerValidate, createCustomer)
customersRouters.get("/customers", getCustomers)
customersRouters.get("/customers/:id", getCustomerbyId)



export default customersRouters