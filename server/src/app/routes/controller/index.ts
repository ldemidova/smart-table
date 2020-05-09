import Router from 'express-promise-router'
import getUsers from './users/getUsers'
import getBugs from './bugs/getBugs'
import paginate from '../paginate'

const router = Router()

router.get('/users', getUsers)

router.get('/bugs', paginate, getBugs)

export default router
