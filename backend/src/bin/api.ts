import express from 'express'
import bodyParser from 'body-parser'
import * as path from 'path'
import { expressHelpers } from '../helpers'
import logger from '../app/logger'

import { router } from '../app/routes'

const app = express()

const server = async () => {
  const port = process.env.SERVER_PORT || 5000

  app.use(bodyParser.json({ type: 'application/*', 'limit': '5mb', verify: expressHelpers.captureRawBody }))
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))

  app.use('/', router)

  app.use('/schema', express.static(path.join(__dirname, '../../public/schema')))

  app.use(expressHelpers.createErrorHandler(logger))
  app.use(expressHelpers.createNotFoundHandler())

  app.listen(port)

  logger.info(`HTTP server start and listen :${port} port`)

  process.on("SIGTERM", () => {
    process.exit(0)
  })
}

server()
