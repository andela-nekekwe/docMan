import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.CREATE_USER:
      return Object.assign({}, state, action.user);
    case types.LOAD_USER_SUCCESS:
      return action.users;
    case types.CREATE_USER_SUCCESS:
      return Object.assign({}, state, action.user);

    case types.UPDATE_USER_SUCCESS:
      return [...state.filter(user => user.id !== action.user.id),
        action.user];
    case types.CURRENT_USER:
      return action.user;
    default:
      return state;
  }
}
