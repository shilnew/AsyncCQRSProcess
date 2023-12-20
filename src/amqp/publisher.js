import amqp from 'amqplib'

const queue = 'order_queue'

const publishOrder = async (obj) => {
  let connection
  try {
    console.log('publisher')
    connection = await amqp.connect('amqp://localhost:5672')
    const channel = await connection.createChannel()

    await channel.assertQueue(queue, {durable: true})
    const input = Buffer.from(JSON.stringify(obj))
    channel.sendToQueue(queue, input)
    console.log('Sent', { input })
    // await channel.close()
  } catch (err) {
    console.warn(err)
  }
}

export default {
  publishOrder,
}
