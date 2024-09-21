import express, { request, response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


//ROTA GET ---> LISTAR/LER
app.get('/usuarios', async (request, response) => {

  const users = await prisma.user.findMany()

    response.status(200).json(users)
})

//ROTA POST --> CRIAR
app.post('/usuarios', async (request, response) => {

  const user =  await prisma.user.create({
        data: {
            name: request.body.name,
            age: request.body.age,
            email: request.body.email
        }
    })
    
        console.log(user)

    response.status(200).json(user)
})

// ROTA PUT --> EDITAR VARIOS

app.put('/usuarios/:id', async (request, response) => {
    
    request.params.id
    const user =  await prisma.user.update({

          where: {
            id: request.params.id
          },
          data: {
              name: request.body.name,
              age: request.body.age,
              email: request.body.email
          }
      })
      
          console.log(user)
  
      response.status(201).json(user)
  })

  // ROTA DELETE ---> DELETAR

  app.delete('/usuarios/:id', async (request, response) => {
        await prisma.user.delete({
            where: {
                id: request.params.id
            }
        })

        response.status(200).json({ message: "Usúario deletado com sucesso!"})
  })

   

app.listen(3000)

//http://localhost:3000