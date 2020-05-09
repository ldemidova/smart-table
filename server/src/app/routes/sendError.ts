import { expressHelpers } from '../../helpers'

const send = (response, error, clarification) => {
  const httpCode = error.code === 'INTERNAL_ERROR' ? 500 : 400
  expressHelpers.sendError(response, error.code, error.message, httpCode, clarification)
}

export default send
