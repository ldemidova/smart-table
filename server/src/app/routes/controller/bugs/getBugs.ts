import { bugHandler } from '../../../bug'
import sendError from '../../sendError'
import { Links } from '../../../../types'

const getBugs = async (request, response) => {
  try {
    const page = response.locals.page
    const pageSize = response.locals.pageSize

    const searchBy = request.query.searchBy
    const userId = parseInt(request.query.userId, 10)

    const { hasNextPage, results, total } = await bugHandler.findAllBugs({ searchBy, userId}, { page, pageSize })

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
      results,
      searchBy,
      userId
    })
  } catch (error) {
    sendError(response, error, {})
  }
}

export default getBugs
