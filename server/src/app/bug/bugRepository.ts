import { EntityManager, pool } from '../../db'
import Bug from './bug'

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

  async findAll () {
    const query = `SELECT :a
      FROM Bug :a
      ORDER BY a.id
      ASC;`

    const entities = await this.query(query, [])

    return entities || []
  }

  async save (bug: Bug) {
    await this.persist(bug)
  }
}

export default new BugRepository()
