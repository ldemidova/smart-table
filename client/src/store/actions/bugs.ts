import { Bugs } from '../../types';
import { GET_BUGS, SET_BUGS } from '../constants';

export const getBugs = () => ({ type: GET_BUGS });
export const setBugs = (payload: Bugs | []) => ({ type: SET_BUGS, payload });
// export const selectUser = (payload: User) => ({ type: SELECT_USER, payload });
