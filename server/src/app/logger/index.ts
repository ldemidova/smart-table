import { loggerHelpers } from '../../helpers'
import config from '../config'

const init = () => {
  const { createLogger } = loggerHelpers

  const logger = createLogger(config.logger)

  return logger
}

export default init()
