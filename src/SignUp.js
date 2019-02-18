import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
// @inject('appStore')
@observer
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refreshPage = this.refreshPage.bind(this);
  }

  refreshPage() {
    // axios를 이용해야 할듯. 공통 필터는 사용않하는게 맞음
    window.location.href = '/#';
    window.location.reload();
  }

  componentDidMount() {}

  render() {
    return (
      <form className="form-signin">
        <img
          className="mb-4"
          src="/docs/4.3/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required=""
          autofocus=""
        />
        <label for="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required=""
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="button"
          onClick={this.refreshPage}
        >
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
      </form>
    );
  }
}

export default SignUp;
