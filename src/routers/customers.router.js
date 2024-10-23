import { Router } from "express";
import newCustomerValidate from "../middlewares/newCustomerValidate.js"
import customersControllers from "../controllers/customersController.js";
const customersRouters = Router()

customersRouters.post("/customers", newCustomerValidate, customersControllers.createCustomer)
customersRouters.get("/customers", customersControllers.getCustomers)
customersRouters.get("/customers/:id", customersControllers.getCustomers)



export default customersRouters