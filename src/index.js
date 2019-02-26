/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/common.scss';
import './index.css';
import './sign.css';
import './navigation.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUp from './SignUp';
import Login from './Login';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './stores/stores';
import queryString from 'query-string';

import Logger from './utils/Logger';
import AppHistory from './utils/AppHistory';

import moment from 'moment';
import 'moment/locale/ko';
moment.locale('ko');

let urlQuery = queryString.parse(AppHistory.location.search);
Logger.info('index.js queryInfo : ' + JSON.stringify(urlQuery));

// state의 상태는 action을 통해서만 가능하게끔 셋팅
configure({
  enforceActions: true
});

let AppComponent = <App />;

let appType = urlQuery.appType;
if (appType && appType === 'signup') {
  AppComponent = <SignUp />;
} else if (appType && appType === 'login') {
  AppComponent = <Login />;
}

let companyCode = urlQuery.companyCode;
if (companyCode) {
  stores.companyStore.setCompanyCode(companyCode);
}

ReactDOM.render(
  <Provider {...stores}>
    <Router>{AppComponent}</Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
