//import { randomUUID } from 'node:crypto'
//import { Database } from './database.js'
import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'
// import fstufy from 'fastfy'
// CommonJs => require
// ESModules => import/export

//criando o primeiro servidor
// criar um usuário (name, email, senha)

// criar usuários
// listagem usuários
// edição de usuários
// remoção de usuarios

// - http
// - metodo http
// - url

// GET,POST, PUT, PTACH, DELETE
// GET => Buscar uma informação do back-end
// POST => Criar uma informação no back-end
// PUT => Atualizar um recurso no back-end
// Patch => Atualizar uma informação especifica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

//GET /users =>Buscando usuario do back-end
// POST /users => Criar um usuario no back-end

// Stateful - Stateless

// JSON - JavaScript Object Notation 
// Cabeçalhos (Requisição/respostas) => Metadadados

// const users = []
//const database = new Database()

const server = http.createServer(async(req, res) => {
    const { method, url } = req

    /*const buffers = []
    
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }
*/
    await json(req, res)

    //if (method === 'GET' && url === '/users'){
       //  return res
        //.setHeader('Content-type', 'application/json')
       // .end(JSON.stringify(users))

        //const users = database.select('users')

        //return res.end(JSON.stringify(users))
    //}

   // if (method === 'POST' && url === '/users') {
        
        //const { name, email } = req.body

        //users.push({
        //const user = {
          //  id: randomUUID(),
            //name,
            //email,
        //}
        //})

        //database.insert('users', user)

       // return res.writeHead(201).end()
    //}

   // return res.writeHead(404).end()

   const route = routes.find(route => {
        return route.method === method && route.path.test(url) 
   })

   if (route) {
        const routeParams = req.url.match(route.path)

        //req.params = { ...routeParams.groups}

        const { query, ...params } = routeParams.groups
        
        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
   }

})

server.listen(3333)




// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatorias
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário

// http://localhost:3333/users?userId=1&name=Diego

// routes
// GET http://localhost:3333/users/1
// DELETE  http://localhost:3333/users/1

//request body
// POST http://localhost:3333/users

// Edição e remoção
