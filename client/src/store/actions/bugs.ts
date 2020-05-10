import { BugsState, BugsParams } from '../../types';
import { GET_BUGS, SET_BUGS } from '../constants';

export const getBugs = (payload: BugsParams) => ({ type: GET_BUGS, payload });
export const setBugs = (payload: BugsState) => ({ type: SET_BUGS, payload });
