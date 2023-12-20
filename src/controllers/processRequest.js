import { OrdersRepository } from '../models'
import { OrderPublisher } from '../amqp'

async function createTokenAndPublish (itemCode, quantity, payment) {
    const userId = 'user_1' // stubbed for test - ideally will be retrived from jwt
    let orderId

    try {
       // save record to DB with status 'Pending' and return token 
       const result = await OrdersRepository.createOrdersReq(userId, itemCode, quantity, payment)
       orderId = result ? result[0]?.id : null
       console.log('Order Created', { orderId })
      const payload = {
        userId,
        orderId,
      }
      // publish input request to queue
      await OrderPublisher.publishOrder(payload)
      console.log('Order Published')
    } catch ({error}) {
        // log errors
        console.log('Error saving to DB', { itemCode, quantity, payment })
        console.log('ERROR', { error })
        throw error
    }
    return orderId
  }
  
  export default {
    createTokenAndPublish
  }