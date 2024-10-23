import { Router } from "express"
import gamesControllers from "../controllers/gamesController.js";
import newGameValidate from "../middlewares/newGameValidate.js"
const gamesRouters = Router()

gamesRouters.post("/games", newGameValidate, gamesControllers.createGame)
gamesRouters.get("/games", gamesControllers.getAllGames)


export default gamesRouters