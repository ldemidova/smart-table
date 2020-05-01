import Router from 'express-promise-router'

const router = Router()

router.use((request, response, next) => {
  response.locals.version = 'v1'
  next()
})

export default router
