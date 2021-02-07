import { createAction, handleActions } from 'redux-actions';

import { storeData } from '../../../async-storage';

const defaultState = {
  userId: null,
  sessionId: null,
  username: null,
  password: null,
  role: null,
  organization: null,
  isAuthenticated: false,
};

// ACTIONS
const saveUser = createAction('SAVE_USER');

// const setAuth = createAction('SET_AUTHENTICATION');

const reducer = handleActions(
  {
    [saveUser]: (state, { payload }) => {
      // save sessionId & userId in AsyncStorage
      if (payload.sessionId) {
        storeData('sessionId', payload.sessionId);
      }

      if (payload.userId) {
        storeData('userId', payload.userId);
      }

      return {
        ...state,
        sessionId: payload.sessionId || state.sessionId,
        username: payload.username || state.username,
        password: payload.password || state.password,
        role: payload.role || state.role,
        organization: payload.organization || state.organization
      };
    }
  },
  defaultState
);

const getAuthInfo = (state) => state.login;

export default reducer;
export { getAuthInfo, saveUser };
