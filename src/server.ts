import fastify from 'fastify'
import crypto from 'crypto'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

app.listen({ port: 3333 }).then(() => {
  console.log('Server is runing!!')
})
