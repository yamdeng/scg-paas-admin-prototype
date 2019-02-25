import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { SketchPicker } from 'react-color';

@withRouter
@inject('appStore')
@observer
class DragDropTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayColorPicker: false, color: '#000' };
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('DragDropTest 테스트');
  }

  render() {
    return <div class="container form-test">DragDropTest</div>;
  }
}

export default DragDropTest;
