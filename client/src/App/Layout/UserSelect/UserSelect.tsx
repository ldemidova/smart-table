import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getUsers, selectUser } from '../../../store/actions';
import { Users, User, UserId, StoreState } from '../../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      margin: '10px 0'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
  }),
);

type Props = {
  getUsers: (() => void),
  selectUser: ((payload: User) => void),
  users?: {
    list: Users,
    selected: User
  }
};

const Component: React.FC<Props> = ({ getUsers, selectUser, users }) => {
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const userId: UserId = event.target.value as UserId;
    const all: User = { id: 'All', username: 'All' };

    const user: User = (users && users.list.find(user => user.id === userId)) || all;

    selectUser(user)
  };

  if (users) {
    const { list, selected } = users;

    return (
      <div className={classes.wrapper}>
        <FormControl className={classes.formControl}>
          <InputLabel id="user-select-label">User</InputLabel>
          <Select
            labelId="user-select-label"
            id="user-select"
            value={selected.id}
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            {
              list.map((item: User) => (
                <MenuItem key={item.id} value={item.id}>{item.username}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
    );
  }

  return null
}

const mapStateToProps = ({ users }: StoreState) => ({
  users
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getUsers: () => { dispatch(getUsers()) },
    selectUser: (payload: User) => { dispatch(selectUser(payload)) }
  }
};

export const UserSelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
