import Router from 'express-promise-router'

const router = Router()

router.get('/system/health', (request, response) => {
  response.json({'current_unix_timestamp': Math.floor(Date.now() / 1000)})
})

export default router
