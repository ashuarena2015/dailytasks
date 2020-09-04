import React, { Component } from 'react';
import { Notification } from '../Common/Notification';


class Login extends Component {

  state = {
    showLoginForm: false,
    showRegisterForm: true
  }

  onHandleChane(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  login() {
    const { login_email, login_password } = this.state;
    const { loginUser } = this.props;
    loginUser(login_email, login_password);
  }

  registerUser() {
    const { user_fn, user_mobile, user_email, user_password } = this.state;
    const { addUser } = this.props;
    const payload = { user_fn, user_mobile, user_email, user_password };
    addUser(payload);
  }

  render() {
    const { showRegisterForm, showLoginForm } = this.state
    const { isLoginRequest, loggedUserInfo, loginFailed, addUserSuccess, addUserFailed, history } = this.props;
    if (Object.keys(loggedUserInfo).length) {
      history.push('/dashboard');
    }
    return (
      <div style={{ padding: '4rem 1rem 2rem' }}>
        {(loginFailed || addUserFailed)
          &&
          <Notification
            message={loginFailed || addUserFailed}
            messageType="error"
            timeToHide="3000"
          />
        }
        {(addUserSuccess)
          &&
          <Notification
            message={addUserSuccess}
            messageType="success"
            timeToHide="3000"
          />
        }
        {/* Register Form */}
        {showRegisterForm && (
          <div className="panel" style={{ marginTop: '0.5rem' }}>
            <div className="panel-body">
              <h3>New user, register here</h3>
              <div className="form-group m-b-rg">
                <label>Full Name</label>
                <input name="user_fn" onChange={e => this.onHandleChane(e)} type="text" />
              </div>
              <div className="form-group m-b-rg">
                <label>Mobile</label>
                <input name="user_mobile" onChange={e => this.onHandleChane(e)} type="text" />
              </div>
              <div className="form-group m-b-rg">
                <label>Email</label>
                <input name="user_email" onChange={e => this.onHandleChane(e)} type="text" />
              </div>
              <div className="form-group m-b-rg">
                <label>Password</label>
                <input name="user_password" onChange={e => this.onHandleChane(e)} type="text" />
              </div>
              <button
                type="button"
                onClick={() => this.registerUser()}
                className="btn btn-login btn-block"
              >
                {isLoginRequest && <span className="fa fa-spin fa-spinner" />} Register
              </button>
              <div className="group-anchor m-t-rg text-center">
                <a href="javascript:void(0)" onClick={() => this.setState({ showLoginForm: true, showRegisterForm: false })}>Login</a>
                <a href="javascript:void(0)" onClick="">Forgot password?</a>
              </div>
            </div>
          </div>
        )}
        {/* Login Form */}
        {showLoginForm && (
          <div className="panel" style={{ marginTop: '0.5rem' }}>
            <div className="panel-body">
              <h3>Existing user, login here</h3>
              <div className="form-group m-b-rg">
                <label>Email</label>
                <input name="login_email" onChange={e => this.onHandleChane(e)} type="text" />
              </div>
              <div className="form-group m-b-rg">
                <label>Password</label>
                <input name="login_password" onChange={e => this.onHandleChane(e)} type="text" />
              </div>
              <button
                type="button"
                onClick={() => this.login()}
                className="btn btn-login btn-block"
              >
                {isLoginRequest && <span className="fa fa-spin fa-spinner" />} Login
              </button>
              <div className="group-anchor m-t-rg text-center">
                <a href="javascript:void(0)" onClick={() => this.setState({ showLoginForm: false, showRegisterForm: true })}>Register</a>
                <a href="javascript:void(0)" onClick="">Forgot password?</a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
