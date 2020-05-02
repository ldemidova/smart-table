import { Logger, Request, Response } from '../types'

interface RawBodyRequest extends Request {
  rawBody?: string
}

export function sendError (res: Response, code: string, mess: string, status: number, clarification: object) {
  clarification = clarification || {}
  res.statusCode = status || 500
  res.setHeader('Content-Type', 'application/json')
  res.json({ code: code, message: mess, clarification: clarification })
}

export function captureRawBody (req: RawBodyRequest, res: Response, buf, encoding: string): void {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8')
  }
}

export function createErrorHandler (logger: Logger) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (error, req: RawBodyRequest, res: Response, next: Function) => {
    if (error.type === 'entity.parse.failed') {
      let rawBody = ''

      // eslint-disable-next-line no-prototype-builtins
      if (req.hasOwnProperty('rawBody')) {
        rawBody = String(req.rawBody)
      }

      logger.error(`JSON body parse error endpoint: ${req.url} request: "${rawBody.substring(0, 80)}"`)
    }

    logger.error(`${error.stack}`, error)
    sendError(res, 'UNCAUGHT_ERROR', 'Uncaught error', 500, {})
  }
}

export function createNotFoundHandler () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (req: RawBodyRequest, res: Response, next: Function) => {
    sendError(res, 'ROUTE_NOT_FOUND', 'Route not found', 404, {
      route: req.url
    })
  }
}
