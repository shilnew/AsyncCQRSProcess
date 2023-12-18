async function getStatus (orderId) {
    let result
    console.log('Order Id', { orderId })
    try {
       // get record from DB with input token 
       const orderRecord = await getOrderById(orderId)

       if (!orderRecord) {
        throw new Error('Not Found')
       }
       // stub test
       if (orderId === '1234') {
        result = {
          status: 'Completed',
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