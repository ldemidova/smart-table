import Router from 'express-promise-router'
import getUsers from './users/getUsers'

const router = Router()

router.use((request, response, next) => {
  response.locals.version = 'v1'
  next()
})

router.get('/users', getUsers)

export default router
