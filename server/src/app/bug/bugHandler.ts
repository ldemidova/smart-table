import bugRepository from './bugRepository'
import Bug from './bug'
import { MetaInfo } from '../../types'


const bugHandler = {
  async findAllBugs (params, { page, pageSize }) {
    const metaInfo: MetaInfo = {
      hasNextPage: false,
      total: 0
    }

    const bugs = await bugRepository.findAll(params, { page, pageSize }, metaInfo)

    return {
      ...metaInfo,
      results: bugs
    }
  },
  
  async saveAllBugs (bugs) {
    for (const bug of bugs) {
      await bugRepository.save(new Bug(bug))
    }
  }
}

export default bugHandler
