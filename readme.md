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
## Curl Commands
curl -X POST -H "Content-Type: application/json" -d '{"itemCode":"ABC12", "quantity":100, "payment": "$80" }'  http://localhost:3000/orders/

curl GET http://localhost:3000/orders/1234
