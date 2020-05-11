import { EntityManager, pool } from '../../../db'
import BugView from './bugView'
import { MetaInfo } from '../../../types'

class BugViewRepository extends EntityManager {
  constructor () {
    super({
      entity: BugView,
      tableName: '',
      primaryKey: ['id'],
      fieldsMap: {
        id: 'id',
        title: 'title',
        username: 'username'
      }
    }, pool)
  }

  getBugTableName () {
    return 'bugs'
  }

  getUserTableName () {
    return 'users'
  }

  mapRowToEntity (values) {
    return new BugView(this.mapRowToEntityParams(this.getFieldsMap(), values) as BugView)
  }

  getWhereClause ({ searchBy, userId }) {
    const userTable = this.getUserTableName()
    const bugTable = this.getBugTableName()

    const clause = searchBy || userId ? 'WHERE ' : ''

    const and = []
    const or = []

    if (searchBy) {
      or.push(`${userTable}.username LIKE '%${searchBy}%'`)
      or.push(`${bugTable}.title LIKE '%${searchBy}%'`)
      or.push(`${bugTable}.id::text LIKE '%${searchBy}%'`)
    }

    if (userId) {
      and.push(`${bugTable}.assignee = ${userId}`)
    }

    or.length && and.push(`(${or.join(' OR ')})`)

    return clause + and.join(' AND ')
  }


  async findAll ({ searchBy, userId }, { page, pageSize }, metaInfo: MetaInfo) {
    const userTable = this.getUserTableName()
    const bugTable = this.getBugTableName()

    const limitExpression = this.getLimitExpression({page, pageSize, oneMore: true})
    const whereClause = this.getWhereClause({ searchBy, userId })

    const query = `
      SELECT
        ${bugTable}.id,
        ${bugTable}.title,
        ${userTable}.username,
        COUNT(*) OVER()
      FROM
        ${bugTable}
      LEFT JOIN
        ${userTable}
      ON
        ${bugTable}.assignee = ${userTable}.id
        ${whereClause}
      ORDER BY
        ${bugTable}.id
      ASC
        ${limitExpression};
      `

    const result = await pool.query(query)

    const entities = result.rows.map((values) => this.mapRowToEntity(values))

    const numberOfEntities = entities.length

    const total = numberOfEntities ? Number(result.rows[0].count) : 0

    metaInfo.hasNextPage = numberOfEntities > pageSize
    metaInfo.total = total

    return entities.slice(0, pageSize)
  }
}

export default new BugViewRepository()
