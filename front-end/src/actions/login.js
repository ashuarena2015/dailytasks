import axios from './axios';
import ActionTypes from '../constants/ActionTypes';

const {
	IS_REQUEST_LOGIN,
	LOGIN_SUCCESS,
  LOGIN_FAILED,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED
} = ActionTypes;


export function isLoginRequest(bool) {
  return {
    type: IS_REQUEST_LOGIN,
    bool
  };
};

export function loginSuccess(response) {
  return {
    type: LOGIN_SUCCESS,
    response
  };
};

export function loginFailed(response) {
  return {
    type: LOGIN_FAILED,
    response
  };
};

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch(isLoginRequest(true));
    axios.post('/login', { login_email: email, login_password: password })
    .then((res) => {
      dispatch(loginSuccess(res.data.data));
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch(loginFailed(error.response.data));
    })
  }
};

export function addUserSuccess(response) {
  return {
    type: ADD_USER_SUCCESS,
    response
  };
};

export function addUserFailed(response) {
  return {
    type: ADD_USER_FAILED,
    response
  };
};

export function addUser(payload) {
  console.log('payload', payload);
  return (dispatch) => {
    dispatch(isLoginRequest(true));
    axios.post('/user/add', payload)
    .then((res) => {
      dispatch(addUserSuccess(res.data));
    })
    .catch((error) => {
      dispatch(addUserFailed(error.response.data));
    })
  }
};
