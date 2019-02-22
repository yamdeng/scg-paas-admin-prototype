import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <div class="container form-test">
        <div class="row">
          <div class="col col-3">라벨1</div>
          <div class="col col-9">값1</div>
          <div class="col col-3">라벨2</div>
          <div class="col col-9">값2</div>
          <div class="col col-3">라벨3</div>
          <div class="col col-9">값3</div>
          <div class="col col-3">라벨4</div>
          <div class="col col-9">값4</div>
        </div>
        <div class="row">
          <button type="button" class="btn btn-primary">
            전송
          </button>
        </div>
      </div>
    );
  }
}

export default FormEdit;
