import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login';
import { loginUser, addUser } from '../actions/login';

function mapStateToProps(state) {
	const {
		login: {
      loggedUserInfo,
      isLoginRequest,
      loginFailed,
      addUserSuccess,
      addUserFailed
    }
	} = state;
	return {
    loggedUserInfo,
    isLoginRequest,
    loginFailed,
    addUserSuccess,
    addUserFailed
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loginUser,
  addUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
