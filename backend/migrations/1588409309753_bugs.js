/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  const columns = {
    id: {
      type: 'bigint',
      notNull: true,
      primaryKey: true
    },
    title: {
      type: 'varchar(255)',
      notNull: true
    },
    assignee: {
      type: 'varchar(255)'
    }
  }

  pgm.createTable(
    'bugs',
    columns,
    { ifNotExists: true }
  )
}

exports.down = (pgm) => {
  pgm.dropTable(
    'bugs',
    { ifExists: true }
  )
}
