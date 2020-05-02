import { bugHandler } from '../../../bug'

const getBugs = async (request, response) => {
  const bugs = await bugHandler.findAllBugs()

  response.statusCode = 200

  response.json({
    results: bugs
  })
}

export default getBugs
