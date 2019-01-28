import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PublishApp from './PublishApp';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <PublishApp />
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
