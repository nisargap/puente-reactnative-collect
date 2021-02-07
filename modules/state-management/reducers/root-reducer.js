import { combineReducers } from 'redux';

import dashboardControls from './dashboard-controls';
import login from './login';

export default combineReducers({
  login,
  dashboardControls
});
