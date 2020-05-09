import { Users, User } from '../../types';
import { SELECT_USER, GET_USERS, SET_USERS } from '../constants';

export const getUsers = () => ({ type: GET_USERS });
export const setUsers = (payload: Users | []) => ({ type: SET_USERS, payload });
export const selectUser = (payload: User) => ({ type: SELECT_USER, payload });
