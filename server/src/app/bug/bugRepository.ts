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

  mapRowToEntity (values) {
    return new Bug(this.mapRowToEntityParams(this.fieldsMap, values) as Bug)
  }

  async findAll ({}, { page, pageSize }, metaInfo: MetaInfo) {
    console.log(page, pageSize)
    const limitExpression = this.getLimitExpression({page, pageSize, oneMore: true})

    const query = `
      SELECT
        *, COUNT(*) OVER()
      FROM
        ${this.getTableName()} as a
      ORDER BY
        a.id
      ASC
        ${limitExpression};
      `

    const result = await pool.query(query)

    const entities = result.rows.map((values) => this.mapRowToEntity(values))
    const numberOfEntities = entities.length
    metaInfo.hasNextPage = numberOfEntities > pageSize

    let total = 0
    if (numberOfEntities > 0) {
      total = Number(result.rows[0].count)
    }

    metaInfo.total = total

    return entities.slice(0, pageSize)
  }

  async save (bug: Bug) {
    await this.persist(bug)
  }
}

export default new BugRepository()
