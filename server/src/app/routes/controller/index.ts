import Router from 'express-promise-router'
import getUsers from './users/getUsers'
import getBugs from './bugs/getBugs'

const router = Router()

router.get('/users', getUsers)

router.get('/bugs', getBugs)

export default router
