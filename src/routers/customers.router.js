import { Router } from "express";
import newCustomerValidate from "../middlewares/newCustomerValidate.js"
import customersControllers from "../controllers/customersController.js";
const customersRouters = Router()

customersRouters.post("/customers", newCustomerValidate, customersControllers.createCustomer)
customersRouters.get("/customers", customersControllers.getAllCustomers)
customersRouters.get("/customers/:id", customersControllers.getCustomersById)


export default customersRouters