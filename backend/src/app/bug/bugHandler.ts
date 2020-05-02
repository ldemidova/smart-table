import bugRepository from './bugRepository'

const bugHandler = {
  async findAllBugs () {
    let users = await bugRepository.findAll()

    return users
  }
}

export default bugHandler
