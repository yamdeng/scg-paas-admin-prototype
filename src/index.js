import './css/common.scss';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Constant from './config/Constant';
import App from './App';
import App2 from './App2';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './stores/stores';
import queryString from 'query-string';

import Logger from './utils/Logger';
import AppHistory from './utils/AppHistory';
import Config from './config/Config';

let urlQuery = queryString.parse(AppHistory.location.search);
let entryHashString = location.hash;
let entryFullUri = entryHashString.substr(2);
let entryUri = entryFullUri;
if (entryFullUri.indexOf('?') !== -1) {
  entryUri = entryUri.substr(0, entryUri.indexOf('?'));
}

Logger.info('entryUri : ' + (entryUri || Config.defaultUri));
Logger.info('index.js queryInfo : ' + JSON.stringify(urlQuery));

AppHistory.block((location, action) => {
  Logger.info('on route block');
  return true;
});

AppHistory.listen((location, action) => {
  // location.pathname ---> route시에 공통으로 구글 서비스 전달
  Logger.info('AppHistory listen : ' + location.pathname);
});

// state의 상태는 action을 통해서만 가능하게끔 셋팅
configure({
  enforceActions: true
});

let AppComponent = <App />;

let appType = urlQuery.appType;
if (appType && appType === 'app2') {
  AppComponent = <App2 />;
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
