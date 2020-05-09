import { EntityManager, pool } from '../../db'
import User from './user'

class UserRepository extends EntityManager {
  constructor () {
    super({
      entity: User,
      tableName: 'users',
      primaryKey: ['id'],
      fieldsMap: {
        id: 'id',
        username: 'username'
      }
    }, pool)
  }

  async findAll () {
    const query = `SELECT :a
      FROM User :a
      ORDER BY a.id
      ASC;`

    const entities = await this.query(query, [])

    return entities || []
  }

  async save (user: User) {
    await this.persist(user)
  }
}

export default new UserRepository()
