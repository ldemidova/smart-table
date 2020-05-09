import userRepository from './userRepository'
import { Users } from '../../types'
import User from './user'

const userHandler = {
  async findAllUsers () {
    const users = await userRepository.findAll()

    return users
  },
  async saveAllUsers (users: Users) {
    for (const { id, username } of users) {
      await userRepository.save(new User(id, username))
    }
  }
}

export default userHandler
