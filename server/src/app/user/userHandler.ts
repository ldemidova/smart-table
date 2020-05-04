import userRepository from './userRepository'

const userHandler = {
  async findAllUsers () {
    const users = await userRepository.findAll()

    return users
  }
}

export default userHandler
