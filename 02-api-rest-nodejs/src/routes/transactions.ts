import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

// Unitários: unidade da sua aplicação
// Untegração: comunicação entre duas ou mais unidades
// e2e - ponta a ponta: simulam um usuário operando na nossa aplicação


// front-end: abre a página de login, digite o texto rosana@rockeseat.com.br  o campo com ID email. clique no botão
// back-end: chamadas HTTO, WebSockets 

// Pirâmide de testes: E2E (não dependem de nenhuma tecnologia, não dependem de arquitetura)
// 2000 testes -> Testes E2e => 16min 

export async function transactionsRoutes(app: FastifyInstance) {
    app.get('/', 
          {
            preHandler: [ checkSessionIdExists ] 
          } ,
        async(request, reply) => {

          const { sessionId } = request.cookies

        const transactions = await knex('transactions')
          .where('session_id', sessionId)
          .select()

        return { transactions }
    })


    app.get('/:id', 
        {
          preHandler: [ checkSessionIdExists ] 
        } ,async (request) => {

        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })


        const { id } = getTransactionParamsSchema.parse(request.params)

        const { sessionId } = request.cookies

        const transaction = await knex('transactions')
          .where({
            session_id: sessionId,
            id,
          })
          .first()

        return { transaction }
    })


    app.get('/summary',
          {
            preHandler: [ checkSessionIdExists ] 
          } , async (request) => {

        const { sessionId } = request.cookies

        const summary = await knex('transactions')
            .sum('amount' , { as:'amount'} )
            .where('session_id', sessionId)
            .first()

        return { summary }
    })

    app.post('/', async(request, reply) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })

        const { title, amount, type } = createTransactionBodySchema.parse(
            request.body,
        )

        let sessionId = request.cookies.sessionId // variavel que pode mudar o valor

        if (!sessionId) {
          sessionId = randomUUID()
          reply.cookie('sessionId', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
          })
        }

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * - 1,
            session_id: sessionId
        })

        return reply.status(201).send()
    })
}