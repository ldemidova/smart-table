import Router from 'express-promise-router'
import getUsers from './users/getUsers'
import getBugs from './bugs/getBugs'

const router = Router()

router.get('/api/users', getUsers)

router.get('/api/bugs', getBugs)

export default router
