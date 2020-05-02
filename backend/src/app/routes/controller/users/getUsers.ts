import { userHandler } from '../../../user'

const getUsers = async (request, response) => {
  const users = await userHandler.findAllUsers()

  response.statusCode = 200

  response.json({
    results: users
  })
}

export default getUsers
