import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import dotenv from 'dotenv'
import gamesRouters from './src/routers/games.router.js'
import customersRouters from './src/routers/customers.router.js'
import rentalsRouter from './src/routers/rentals.router.js'
import errorHandler from './src/middlewares/error.handler.js'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(gamesRouters)
app.use(customersRouters)
app.use(rentalsRouter)
app.use(errorHandler)
const porta = process.env.PORT || 5000
app.listen(porta, () => {
  console.log(`Servidor rodando na porta: ${porta}`)
})