import amqp from 'amqplib'
import { OrdersRepository } from '../models'

const queue = 'order_queue'

async function processMessage(data) {
    const orderStatus = 'Received'
    console.log('DATA', { data })
    await OrdersRepository.createOrders(data.userId, data.orderId, orderStatus)
}

const consumer = async () => {
  try {
    console.log('subscriber')
    const connection = await amqp.connect('amqp://localhost:5672')
    const channel = await connection.createChannel()
    channel.prefetch(10)
    process.once('SIGINT', async () => {
      await channel.close()
      await connection.close()
      process.exit(0)
    })

    await channel.assertQueue(queue, {durable: true})
    await channel.consume(queue, async (message) => {
        let data
        if (message) {
          data = JSON.parse(message.content)
          console.log('processing message', { data })
        }
        await processMessage(data)
        console.log('here')
        await channel.ack(message)
      },
      { noAck: false }
    )

    console.log(" [*] Waiting for messages. To exit press CTRL+C")
  } catch (err) {
    console.warn(err)
  }
}

export default consumer

consumer()