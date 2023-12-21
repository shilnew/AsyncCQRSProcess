import request from 'supertest'
const app = require('../index')

import { ProcessRequestController } from '../controllers'

const API = 'http://localhost:3000'

describe('Route test - POST success', () => {
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
})

describe('Route test - POST Bad Request', () => {
    it('POST should return a 201 status and orderId on successful request', (done) => {
        jest
            .spyOn(ProcessRequestController, 'createTokenAndPublish')
            .mockReturnValue(1)
        request(API)
        .post('/orders/')
        .send({
            itemCode: 'exampleItemCode',
            quantity: 10,
        })
        .end((err, res) => {
            expect(res.status).toBe(400)
            expect(res.error.text).toBe('Invalid Request Body - "payment" is required')
            done()
        })
    })
})

describe('Route test - GET Success', () => {
  it('GET should return 200 and response for successful request', (done) => {
    request(API)
      .get('/orders/1')
      .end((err, res) => {
        expect(res.status).toBe(200)
        const jsonResult = JSON.parse(res.text)
        expect(jsonResult.data).toStrictEqual({ processStatus: 'Received', processData: '1' })
        done()
      })
  })
})

describe('Route test - GET errors', () => {
    it('GET should return 404 for OrderId not defined', (done) => {
      request(API)
        .get('/orders/')
        .end((err, res) => {
          expect(res.status).toBe(404)
          done()
        })
    })
    it('GET should return 404 for Order Id not found', (done) => {
      request(API)
        .get('/orders/444')
        .end((err, res) => {
        expect(res.status).toBe(404)
        expect(res.text).toBe('Not Found')
        done()
      })
    })  
})
