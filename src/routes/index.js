import KoaRouter from '@koa/router'

import OrderProcessRoutes from './allProcess'
import HealthCheckRoutes from './healthCheck'

const router = new KoaRouter()

router.use(OrderProcessRoutes.routes())
router.use(HealthCheckRoutes.routes())

export default router