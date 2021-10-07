import Koa from 'koa'

import { router } from './routes'

const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(process.env.SERVER_PORT)
