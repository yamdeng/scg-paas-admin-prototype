import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
// import queryString from 'query-string';
import axios from 'axios';
import Helper from './utils/Helper';

@withRouter
@inject('appStore', 'uiStore')
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginId: null, password: null };
    this.moveHome = this.moveHome.bind(this);
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event, nextInputName, inputMaxLength) {
    let inputName = event.target.name;
    let inputValue =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    this.setState({ [inputName]: inputValue });
  }

  moveHome() {
    this.props.history.push('/home');
  }

  login() {
    axios
      .post('/api/login', {
        id: this.state.loginId,
        password: this.state.password
      })
      .then(result => {
        Helper.saveInfoToLocalStorage('authToken', result.data.authToken);
        window.location.href = '/#/?checkLogin=true';
        window.location.reload();
      });
  }

  componentDidMount() {
    this.props.uiStore.hideNavigation();
    // let defParams = this.props.match.params;
    // let search = this.props.location.search;
    // let urlQuery = queryString.parse(search);
  }

  render() {
    return (
      <form className="form-signin">
        <div className="text-center mb-4">
          <img
            className="mb-4"
            src="/docs/4.3/assets/brand/bootstrap-solid.svg"
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 font-weight-normal">로그인</h1>
        </div>

        <div className="form-label-group">
          <input
            type="email"
            id="inputEmail"
            name="loginId"
            className="form-control"
            placeholder="loginId"
            required=""
            autofocus=""
            value={this.state.loginId}
            onChange={event => this.handleInputChange(event)}
          />
          <label for="inputEmail">로그인 id</label>
        </div>

        <div className="form-label-group">
          <input
            type="password"
            id="inputPassword"
            name="password"
            className="form-control"
            placeholder="password"
            required=""
            value={this.state.password}
            onChange={event => this.handleInputChange(event)}
          />
          <label for="inputPassword">password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="button"
          onClick={this.login}
        >
          로그인
        </button>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="button"
          onClick={this.moveHome}
        >
          movehome
        </button>
        <p className="mt-5 mb-3 text-muted text-center">© 2017-2019</p>
      </form>
    );
  }
}

export default Login;
