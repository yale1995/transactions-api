import { expect, beforeAll, afterAll, describe, it, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'child_process'

describe('Transactions routes', () => {
  beforeEach(async () => {
    execSync('pnpm run knex migrate:rollback --all')
    execSync('pnpm run knex migrate:latest')
  })

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({ title: 'New transaction', amount: 5000, type: 'credit' })

    expect(response.status).toEqual(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({ title: 'New transaction', amount: 5000, type: 'credit' })

    const cookies = createTransactionResponse.get('set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies ?? '')
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({ title: 'New transaction', amount: 3000, type: 'credit' })

    const cookies = createTransactionResponse.get('set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies ?? '')
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies ?? '')
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 3000,
      }),
    )
  })

  it('should be able to get a transactions summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({ title: 'Credit transaction', amount: 5000, type: 'credit' })

    const cookies = createTransactionResponse.get('set-Cookie')

    await request(app.server)
      .post('/transactions')
      .send({ title: 'Credit transaction', amount: 2000, type: 'debit' })
      .set('Cookie', cookies ?? '')

    const transactionSummaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies ?? '')
      .expect(200)

    expect(transactionSummaryResponse.body.summary).toEqual(
      expect.objectContaining({
        amount: 3000,
      }),
    )
  })
})
