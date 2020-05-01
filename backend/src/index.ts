import express from 'express'
import * as path from 'path'

import { router, routerV1 } from './app/routes'

const app = express()

const server = async () => {
  const port = 5000

  app.use('/', router)
  app.use('/v1/', routerV1)

  app.use('/schema', express.static(path.join(__dirname, '/../public/schema')))

  app.listen(port)

  console.log(`HTTP server start and listen :${port} port`)

  process.on("SIGTERM", () => {
    process.exit(0)
  })
}

server()
