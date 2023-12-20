import { OrdersRepository } from '../models'

async function getStatus (orderId) {
    let result
    console.log('Order Id', { orderId })
    try {
       // get record from DB with input token 
       const userId = 'user_1' // stubbed for test - ideally will be retrived from jwt
       const orderRecord = await OrdersRepository.getOrderById(orderId, userId)
       console.log('Order Found', { orderId: orderRecord[0].order_id })
       if (!orderRecord) {
        throw new Error('Not Found')
       }
       
       if (orderId === String(orderRecord[0].order_id)) {
        result = {
          status: orderRecord[0].order_status,
          data: orderId,
        }
       } else {
        result = {
          status: 'Pending',
          data: orderId,
        }
       }
    } catch (error) {
        // log errors
        console.log('Error getting result from DB', { result })
        throw error
    }
    return result
  }
  
  export default {
    getStatus
  }