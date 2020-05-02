import userRepository from './userRepository'

const userHandler = {
  async findAllUsers () {
    let users = await userRepository.findAll()

    return users
  }
}

export default userHandler
