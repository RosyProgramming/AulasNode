import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './toutes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)

//app.addHook('preHandler', async (request, reply) => {
//  console.log(`[${request.method}] ${request.url}`)
//})

app.register(transactionsRoutes, {
  prefix: 'transactions'
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })

