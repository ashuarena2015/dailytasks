import { combineReducers } from 'redux';
import login from './login';
import dashboard from './dashboard';

const reducers = combineReducers({
	login,
	dashboard
});

export default reducers;
