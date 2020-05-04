import { LoggerConfig } from '../../types'

const init = () => {
  return {
    devMode: !!parseInt(process.env.DEV_MODE),
    postgresql: {
      connectionString: process.env.DATABASE_URL
    },
    logger: {
      level: process.env.LOGGER_LEVEL || 'warn',
      environment: process.env.NODE_ENV
    } as LoggerConfig
  }
}

export default init()
