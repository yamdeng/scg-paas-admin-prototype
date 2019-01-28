import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import './App.css';
import Logger from './utils/Logger';

@withRouter
@inject('appStore')
@observer
class App extends Component {
  init() {
    Logger.info('App init call');
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: 60 }}>App2</div>
      </div>
    );
  }
}

export default App;
