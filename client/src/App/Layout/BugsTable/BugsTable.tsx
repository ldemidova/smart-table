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
import { BugsParams, Bugs, StoreState, UserId } from '../../../types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getBugs } from '../../../store/actions';

const useStyles = makeStyles({
  table: {
    minWidth: 500
  },
  empty: {
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

type Props = {
  getBugs: ((params: BugsParams) => void),
  list: Bugs,
  page: number,
  pageSize: number,
  searchBy: string,
  total: number,
  byUser: UserId
};

const Component: React.FC<Props> = ({
  getBugs,
  list,
  page,
  pageSize,
  searchBy,
  total,
  byUser
}) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = React.useState(page);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  useEffect(() => {
    getBugs({ page: currentPage + 1, pageSize: rowsPerPage, searchBy, userId: byUser });
  }, [
    getBugs,
    currentPage,
    rowsPerPage,
    byUser,
    searchBy
  ]);

  if (list && list.length) {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="bugs table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Assignee</TableCell>
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
                    {item.username}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                colSpan={3}
                count={total}
                rowsPerPage={rowsPerPage}
                page={currentPage}
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

  return (
    <div className={classes.empty}>No data</div>
  );
}

const mapStateToProps = ({ bugs, users: { selected: { id } } }: StoreState) => ({
  ...bugs,
  byUser: id
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getBugs: (params: BugsParams) => { dispatch(getBugs(params)) }
  }
};

export const BugsTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
