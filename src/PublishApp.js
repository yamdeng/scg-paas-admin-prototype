import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './publish/Home';
import List from './publish/List';

class PublishApp extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={List} />
      </div>
    );
  }
}

export default PublishApp;
