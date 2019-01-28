import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('uiStore')
@observer
class LoadingBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let loadingBarStyle = {};
    let displayLoadingBar = this.props.uiStore.displayLoadingBar;
    if (displayLoadingBar) {
      loadingBarStyle.display = 'block';
    } else {
      loadingBarStyle.display = 'none';
    }
    return (
      <div id="loadingbar" style={loadingBarStyle}>
        <div id="loader" />
      </div>
    );
  }
}

export default LoadingBarContainer;
