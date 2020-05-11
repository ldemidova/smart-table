import bugViewRepository from './bugViewRepository'
import { MetaInfo } from '../../../types'

const bugViewHandler = {
  async findAllBugs (params, { page, pageSize }) {
    const metaInfo: MetaInfo = {
      hasNextPage: false,
      total: 0
    }

    const bugs = await bugViewRepository.findAll(params, { page, pageSize }, metaInfo)

    return {
      ...metaInfo,
      results: bugs
    }
  }
}

export default bugViewHandler
