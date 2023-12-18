import { OrdersRepository } from '../models'
async function createTokenAndPublish (itemCode, quantity, payment) {
    const userId = 'user_1' // stubbed for test - ideally will be retrived from jwt
    let result

    try {
       // save record to DB with status 'Pending' and return token 
       result = await OrdersRepository.createOrdersReq(userId, itemCode, quantity, payment)
       console.log('Order Created', { result: result[0]?.id })

       // publish input request to queue
       
    } catch ({error}) {
        // log errors
        console.log('Error saving to DB', { itemCode, quantity, payment })
        console.log('ERROR', { error })
        throw error
    }
    return result[0]?.id
  }
  
  export default {
    createTokenAndPublish
  }