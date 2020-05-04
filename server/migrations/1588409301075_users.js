/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  const columns = {
    id: {
      type: 'bigint',
      notNull: true,
      primaryKey: true
    },
    username: {
      type: 'varchar(255)',
      notNull: true
    }
  }

  pgm.createTable(
    'users',
    columns,
    { ifNotExists: true }
  )
}

exports.down = (pgm) => {
  pgm.dropTable(
    'users',
    { ifExists: true }
  )
}
