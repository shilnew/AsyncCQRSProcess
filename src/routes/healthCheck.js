import KoaRouter from '@koa/router'

const router = new KoaRouter({
  prefix: '/health-check'
})

router.get('/', (ctx, next) => {
  ctx.body = {
    meta: {
      status: '200'
    }
  }
})

export default router
