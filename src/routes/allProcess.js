import KoaRouter from '@koa/router'
import { validateRequest as validate } from '../utils/validate'
import { jwtValidation } from './middleware'
import { ProcessRequestController, GetStatusController } from '../controllers'
import joi from 'joi'

const router = new KoaRouter({
  prefix: '/orders'
})
router.use(jwtValidation)

router.post('/', 
  validate({
    body: {
      itemCode: joi.string().required,
      quantity: joi.number().required,
      payment: joi.string().required
    },
  }),
  async (ctx) => {
    const { itemCode, quantity, payment } = ctx.request.body
    const token = await ProcessRequestController.createTokenAndPublish(itemCode, quantity, payment)
    ctx.status = 201
    ctx.body = { orderId: token }
})

router.get('/:orderId', async (ctx) => {
  const { orderId } = ctx.params
  let result
  try {
    result = await GetStatusController.getStatus(orderId)
    console.log('Results from Order status', { result })
  } catch (error) {
    console.log({ error })
  }
  if (result) {
    ctx.body = {
      data: {
        processStatus: result?.status,
        processData: result?.data
      }
    }
  } else {
    ctx.status = 404
  }

})

export default router
