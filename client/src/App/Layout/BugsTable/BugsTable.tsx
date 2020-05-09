import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BugsTablePaginationActions } from './BugsTablePaginationActions';
import { Bugs } from '../../../types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getBugs } from '../../../store/actions';

const useStyles = makeStyles({
  table: {
    minWidth: 500
  },
});

type Props = {
  getBugs: (() => void),
  bugs?: {
    list: Bugs,
    search: string
  }
};

const Component: React.FC<Props> = ({ getBugs, bugs }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getBugs();
  }, [getBugs]);

  if (bugs) {
    const { list, search } = bugs;

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="bugs table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>assignee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              list.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">
                    {item.id}
                  </TableCell>
                  <TableCell>
                    {item.title}
                  </TableCell>
                  <TableCell>
                    {item.assignee}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={list.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={BugsTablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }

  return null;
}

const mapStateToProps = (bugs: Bugs) => ({
  ...bugs
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getBugs: () => { dispatch(getBugs()) }
  }
};

export const BugsTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
