import { FastifyInstance } from "fastify"
import { authenticate } from "./controllers/authenticate"
import { register } from "./controllers/register"

export async function appRoutes(app:FastifyInstance){
    // criando uma autenticação de login
    app.post('/users', register)

    app.post('/sessions', authenticate)
}