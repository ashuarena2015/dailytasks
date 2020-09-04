import ActionTypes from '../constants/ActionTypes';

const {
	IS_REQUEST_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	ADD_USER_SUCCESS,
	ADD_USER_FAILED
} = ActionTypes;

const initialState = {
	isLoginRequest: false,
	loggedUserInfo: {}
};

const Login = (state = initialState, action) => {
	switch (action.type) {
	case IS_REQUEST_LOGIN:
		return {
			...state,
			isLoginRequest: true
		};
	case LOGIN_SUCCESS:
		return {
			...state,
			loggedUserInfo: action.response,
			isLoginRequest: false,
			loginFailed: ''
		};
	case LOGIN_FAILED:
		return {
			...state,
			loggedUserInfo: '',
			loginFailed: action.response,
			isLoginRequest: false
		};
	case ADD_USER_SUCCESS:
		return {
			...state,
			addUserSuccess: action.response,
			addUserFailed: '',
			isLoginRequest: false
		}
	case ADD_USER_FAILED:
		return {
			...state,
			addUserSuccess: '',
			addUserFailed: action.response,
			isLoginRequest: false
		}
	default:
		return state;
	}
};

export default Login;
