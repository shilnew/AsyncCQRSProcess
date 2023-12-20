import client from './db'

const getOrderById = async (orderId, userId) => {
    const result = await client.query('SELECT * FROM ORDERS WHERE user_id = $1 and order_id = $2',
    [userId, orderId])
    return result.rows
}

const createOrdersReq = async (userId, itemCode, quantity, payment) => {
    const dateNow = new Date()
    let results
    try {
        results = await client.query(
            `INSERT INTO ORDERS_REQ (user_id, item_code, quantity, payment, created_on, updated_on) 
            VALUES ($1, $2, $3, $4, $5, $5)
            RETURNING id`,
            [userId, itemCode, quantity, payment, dateNow])
        console.log('Orders_req saved', { results })
    } catch (error) {
        console.log('Error during save', { error })
        throw error
    }
    return results.rows
}

const createOrders = async (userId, orderId, orderStatus) => {
    const dateNow = new Date()
    let results
    try {
        results = await client.query(
            `INSERT INTO ORDERS (user_id, order_id, order_status, created_on, updated_on) 
            VALUES ($1, $2, $3, $4, $4)
            RETURNING order_id`,
            [userId, orderId, orderStatus, dateNow])
        console.log('Orders saved', { results })
    } catch (error) {
        console.log('Error during save', { error })
        // throw error
    }
    return results?.rows
}

export default {
    getOrderById,
    createOrdersReq,
    createOrders,
}