import logger from '../app/logger'
import { bugHandler } from '../app/bug'
import { userHandler } from '../app/user'
import bugs from '../data/bugs.json'
import users from '../data/users.json'

const initData = async () => {
  logger.info(`[initData] Init data`)

  try {
    await userHandler.saveAllUsers(users)
    await bugHandler.saveAllBugs(bugs)
  } catch (error) {
    logger.info(`[initData] Init data with error: ${error.message}`)
  }
}

initData()
