import express from 'express'
import bodyParser from 'body-parser'
import * as path from 'path'
import { expressHelpers } from '../helpers'
import logger from '../app/logger'
import { bugHandler } from '../app/bug'
import { userHandler } from '../app/user'
import bugs from '../data/bugs.json'
import users from '../data/users.json'


import { router } from '../app/routes'

const app = express()

const server = async () => {
  const port = process.env.SERVER_PORT || 5000

  app.use(bodyParser.json({ type: 'application/*', 'limit': '5mb', verify: expressHelpers.captureRawBody }))
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))

  app.use('/api', router)

  app.use('/schema', express.static(path.join(__dirname, '../../public/schema')))

  app.use(expressHelpers.createErrorHandler(logger))
  app.use(expressHelpers.createNotFoundHandler())

  app.listen(port)

  logger.info(`HTTP server start and listen :${port} port`)

  await bugHandler.saveAllBugs(bugs)
  await bugHandler.saveAllBugs(bugs)

  process.on("SIGTERM", () => {
    process.exit(0)
  })
}

const initBugs = async () => {
  logger.info(`[initData] Init bugs`)

  try {
    await bugHandler.saveAllBugs(bugs)
  } catch (error) {
    logger.info(`[initData] Init bugs with error: ${error.message}`)
  }
}

const initUsers = async () => {
  logger.info(`[initData] Init users`)

  try {
    await userHandler.saveAllUsers(users)
  } catch (error) {
    logger.info(`[initData] Init users with error: ${error.message}`)
  }
}

initBugs()
initUsers()

server()
