import { User, Users, UsersState } from '../../types';
import { SET_USERS, SELECT_USER } from '../constants';

type UsersAction = {
  type: string,
  payload: User | Users | []
};

const initState: UsersState = Object.freeze({
  list: [],
  selected: {
    id: 'All',
    username: 'All'
  }
})

const users = (state = initState, { type, payload }: UsersAction) => {
  switch (type) {
    case SET_USERS: {
      return { ...state, list: payload }
    }
    case SELECT_USER: {
      return { ...state, selected: payload }
    }
    default: return state
  }
}

export { users };
