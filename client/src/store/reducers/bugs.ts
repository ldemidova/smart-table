import { Bugs } from '../../types';
import { } from '../constants';

type BugsState = {
  list: Bugs | [],
  search: ''
};

type BugsAction = {
  type: string,
  payload: Bugs | string
};

const initState: BugsState = {
  list: [],
  search: ''
};

const bugs = (state = initState, { type, payload }: BugsAction) => {
  switch (type) {
    case 'SET_BUGS': {
      return { ...state, list: payload }
    }
    case 'SEARCH_BUGS': {
      return { ...state, search: payload }
    }
    default: return state
  }
}

export { bugs };
