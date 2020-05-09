import { Links } from '../../types'

const paginate = (request, response, next) => {
  const queryPage = request.query.page
  const queryPageSize = request.query.pageSize

  const page = queryPage === undefined ? 1 : parseInt(queryPage)
  const pageSize = queryPageSize === undefined ? 20 : parseInt(queryPageSize)

  if (Number.isNaN(page) || page <= 0) {
    response
      .status(400)
      .json({'message': 'Query parameter "page" must be a positive integer'})
  }

  if (Number.isNaN(pageSize) || pageSize <= 0) {
    response
      .status(400)
      .json({'message': 'Query parameter "pageSize" must be a positive integer'})
  }

  const links: Links = {}

  const nextUrl = new URL(`${request.protocol}://${request.hostname}${request.originalUrl}`)
  nextUrl.searchParams.set('page', (page + 1).toString())

  links.next = nextUrl.toString()

  if (page > 1) {
    const prevUrl = new URL(`${request.protocol}://${request.hostname}${request.originalUrl}`)
    prevUrl.searchParams.set('page', (page - 1).toString())

    links.prev = prevUrl.toString()
  }

  response.locals.links = links
  response.locals.page = page
  response.locals.pageSize = pageSize

  next()
}

export default paginate
