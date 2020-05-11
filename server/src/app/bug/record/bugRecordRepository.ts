import { EntityManager, pool } from '../../../db'
import BugRecord from './bugRecord'

class BugRecordRepository extends EntityManager {
  constructor () {
    super({
      entity: BugRecord,
      tableName: 'bugs',
      primaryKey: ['id'],
      fieldsMap: {
        id: 'id',
        title: 'title',
        assignee: 'assignee'
      }
    }, pool)
  }

  async save (bug: BugRecord) {
    await this.persist(bug)
  }
}

export default new BugRecordRepository()
