import { bugHandler } from '../../../bug'
import sendError from '../../sendError'
import { Links } from '../../../../types'

const getBugs = async (request, response) => {
  try {
    const page = response.locals.page
    const pageSize = response.locals.pageSize

    const { hasNextPage, results, total } = await bugHandler.findAllBugs({}, { page, pageSize })

    const links: Links = {}
    const { prev, next } = response.locals.links

    if (hasNextPage && next) {
      links.next = next
    }

    if (prev) {
      links.prev = prev
    }

    response.statusCode = 200

    response.json({
      page,
      pageSize,
      links,
      total,
      results
    })
  } catch (error) {
    console.log(error)
    sendError(response, error, {})
  }
}

export default getBugs
