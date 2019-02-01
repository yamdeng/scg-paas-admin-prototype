import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Logger from '../utils/Logger';
import AppHistory from '../utils/AppHistory';

@withRouter
@inject('appStore')
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // location.search ---> '' 값임. 적용않됨
    // Logger.info('location.search : ' + location.search);
    // Logger.info('AppHistory.location.search : ' + AppHistory.location.search);
    // Logger.info('props.location.search : ' + this.props.location.search);
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('관리자 개발 이슈 테스트');
  }
  render() {
    return (
      <div>
        <h1>관리자 개발 이슈 테스트</h1>
      </div>
    );
  }
}

export default Home;
