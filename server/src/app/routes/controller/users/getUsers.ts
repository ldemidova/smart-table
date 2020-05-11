import { userHandler } from '../../../user'
import sendError from '../../sendError'

const getUsers = async (request, response) => {
  try {
    const users = await userHandler.findAllUsers()

    response.statusCode = 200

    response.json({
      results: users
    })
  } catch (error) {
    sendError(response, error, {})
  }
}

export default getUsers
