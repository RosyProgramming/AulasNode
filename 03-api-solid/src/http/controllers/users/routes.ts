import { FastifyInstance } from "fastify"
import { authenticate } from "./authenticate"
import { register } from "./register"
import { profile } from './profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app:FastifyInstance){
    // criando uma autenticação de login
    app.post('/users', register)

    app.post('/sessions', authenticate)

    /** Authenticated */
   // app.get('/me', profile)
   app.get('/me', { onRequest: [verifyJwt] }, profile)
}