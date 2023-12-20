## About the app
```
Simple way to demonstrate CQRS (Command Query Responsibility Seperation) to separate the command side (write operations) from the query side (read operations) of the system.
Taking Order processing in a basic sense, this app stubs out the backend part having
2 Rest API endpoints - POST and GET.
The POST `/orders` endpoint just registers the order in the `order_req` db table, after some validations. Then the message is published to RabbitMQ where the consumer acks the message and processes it. All this happens asyncronously to help process multiple orders faster (scaling). The processing of the order + status is stored in a separate table `orders`.
The GET `/orders/:orderId` endpoint queries this `orders` table and posts the response to the calling client.
```

## Setup & Testing Process

You'll need node installed, preferable version 12 or later.

```
npm i
docker-compose up -d
npm run dev
```
To test if it's running properly:
```
curl http://localhost:3000/health-check
```
To run tests
```
npm test
```
## Curl Commands
curl -X POST -H "Content-Type: application/json" -d '{"itemCode":"ABC12", "quantity":100, "payment": "$80" }'  http://localhost:3000/orders/

```
Response expected: {"orderId":1}
```

curl -X GET http://localhost:3000/orders/1

```
Response expected: {"data":{"processStatus":"Received","processData":"6"}}
```

Wait 10 seconds and try again curl -X GET http://localhost:3000/orders/1

```
Response expected: {"data":{"processStatus":"Completed","processData":"6"}}
```