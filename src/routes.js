import Router from '@koa/router'

import * as users from './modules/users'

export const router = new Router()

// Auth
router.post('/login', users.login)

// Users
router.get('/users', users.list)
router.post('/users', users.create)
router.put('/users/:id', users.update)
router.delete('/users/:id', users.remove)
