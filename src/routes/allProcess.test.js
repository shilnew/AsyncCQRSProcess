import request from 'supertest'
const app = require('../index')

import { ProcessRequestController } from '../controllers'

const API = 'http://localhost:3000'

describe('Routes test', () => {
  it('POST should return a 201 status and orderId on successful request', (done) => {
    jest
        .spyOn(ProcessRequestController, 'createTokenAndPublish')
        .mockReturnValue(1)
    request(API)
      .post('/orders/')
      .send({
        itemCode: 'exampleItemCode',
        quantity: 10,
        payment: '$10',
      })
      .end((err, res) => {
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('orderId')
        done()
      })
  })

  it('GET should return 200 and response for successful request', (done) => {
    request(API)
      .get('/orders/1')
      .end((err, res) => {
        console.log({ res })
        expect(res.status).toBe(200)
        expect(res.text).toBe( "{\"data\":{\"processStatus\":\"Received\",\"processData\":\"1\"}}")
        done()
      })
  })
})
