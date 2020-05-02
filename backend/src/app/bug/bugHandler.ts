import bugRepository from './bugRepository'

const bugHandler = {
  async findAllBugs () {
    const users = await bugRepository.findAll()

    return users
  }
}

export default bugHandler
