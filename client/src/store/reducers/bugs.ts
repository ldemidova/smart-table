import { BugsState, BugsAction } from '../../types';
import { SET_BUGS, SEARCH_BUGS } from '../constants';

const initState: BugsState = {
  list: [],
  searchBy: '',
  page: 0,
  pageSize: 20,
  total: 10
};

const bugs = (state = initState, { type, payload }: BugsAction) => {
  switch (type) {
    case SET_BUGS: {
      return { ...payload }
    }
    case SEARCH_BUGS: {
      return { ...state, searchBy: payload }
    }
    default: return state
  }
}

export { bugs };
