import { FastifyInstance } from "fastify"
import { authenticate } from "./controllers/authenticate"
import { register } from "./controllers/register"
import { profile } from '@/http/controllers/profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function appRoutes(app:FastifyInstance){
    // criando uma autenticação de login
    app.post('/users', register)

    app.post('/sessions', authenticate)

    /** Authenticated */
   // app.get('/me', profile)
   app.get('/me', { onRequest: [verifyJwt] }, profile)
}