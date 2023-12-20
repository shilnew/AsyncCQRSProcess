import Koa from 'koa'
import routes from './routes'
import bodyParser from 'koa-bodyparser'

const app = new Koa()

// Parse HTTP POST body
app.use(bodyParser())
app.use(async (ctx, next) => {
    console.log('Incoming HTTP Request', {
        METHOD: ctx.method,
        URL: ctx.originalUrl,
        BODY: ctx.request.body,
      })
    return next()
})

app.use(routes.routes())

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
