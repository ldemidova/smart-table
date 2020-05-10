import { EntityManager, pool } from '../../db'
import Bug from './bug'
import { MetaInfo } from '../../types'

class BugRepository extends EntityManager {
  constructor () {
    super({
      entity: Bug,
      tableName: 'bugs',
      primaryKey: ['id'],
      fieldsMap: {
        id: 'id',
        title: 'title',
        assignee: 'assignee'
      }
    }, pool)
  }

  getJoinMap () {
    return {
      id: 'id',
      title: 'title',
      username: 'username'
    }
  }

  getBugTableName () {
    return 'bugs'
  }

  getUserTableName () {
    return 'users'
  }

  mapRowToEntity (values) {
    return new Bug(this.mapRowToEntityParams(this.getJoinMap(), values) as Bug)
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
    }

    if (userId) {
      and.push(`${bugTable}.assignee = ${userId}`)
    }

    or.length && and.push(or.join(' OR '))

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

  async save (bug: Bug) {
    await this.persist(bug)
  }
}

export default new BugRepository()
