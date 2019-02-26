import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
moment.locale('ko');

@withRouter
@inject('appStore')
@observer
class DateRangeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('DateRangeTest');
  }

  render() {
    return <div>DateRangeTest</div>;
  }
}

export default DateRangeTest;
