import bugRepository from './bugRepository'
import { Bugs } from '../../types'
import Bug from './bug'

const bugHandler = {
  async findAllBugs () {
    const users = await bugRepository.findAll()

    return users
  },
  async saveAllBugs (bugs: Bugs) {
    for (const { id, title, assignee } of bugs) {
      await bugRepository.save(new Bug(id, title, assignee))
    }
  }
}

export default bugHandler
