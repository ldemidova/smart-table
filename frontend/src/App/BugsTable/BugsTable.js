import React from 'react'
import './BugsTable.css'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

function createData(id, title, asignee) {
  return { id, title, asignee }
}

const rows = [
  createData(1, 'Frozen yoghurt', 'Nick'),
  createData(2, 'Ice cream sandwich', 'Nick'),
  createData(3, 'Eclair', 'Nick'),
  createData(4, 'Cupcake', 'Nick'),
  createData(5, 'Gingerbread', 'Nick')
]

function BugsTable () {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell align="right">Title</TableCell>
          <TableCell align="right">Asignee</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.title}>
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="right">{row.title}</TableCell>
            <TableCell align="right">{row.asignee}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export { BugsTable }
