const { Client } = require('pg')
const client = new Client({
  user: 'test_user',
  host: 'localhost',
  database: 'orders_db',
  password: 'test_password',
  port: 5432,
})

client.connect().then(() => {
  console.log('Client', { client })  
  client.query('SELECT NOW()', (err, res) => {
    console.log(res.rows)
  })
}).catch((error) => {
    console.log('Error connecting to DB',{ error })
})

export default client 