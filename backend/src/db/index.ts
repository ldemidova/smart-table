import { pgHelpers } from '../helpers'
import config from '../app/config'

const { createPool, EntityManager } = pgHelpers

const pool = createPool(config.postgresql.connectionString)

export {
  pool,
  EntityManager
}
