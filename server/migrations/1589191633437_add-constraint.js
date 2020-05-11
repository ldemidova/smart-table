/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.addConstraint(
    'bugs',
    'bugs_assignee_fk',
    {
      foreignKeys: [{
        columns: 'assignee',
        references: 'users(id)',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      }]
    }
  )
}

exports.down = pgm => {
  pgm.dropConstraint(
    'bugs',
    'bugs_assignee_fk',
    {
      foreignKeys: [{
        columns: 'assignee',
        references: 'users(id)',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      }]
    }
  )
}
