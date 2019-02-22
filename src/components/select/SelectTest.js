import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

@withRouter
@inject('appStore')
@observer
class SelectTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }

  submit() {}

  componentDidMount() {
    this.props.appStore.changeHeadTitle('SelectTest');
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div class="container form-test">
        <div class="row">
          <div class="col col-3">select1</div>
          <div class="col col-9">
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          </div>
          <div class="col col-3">라벨2</div>
          <div class="col col-9">값2</div>
          <div class="col col-3">라벨3</div>
          <div class="col col-9">값3</div>
          <div class="col col-3">라벨4</div>
          <div class="col col-9">값4</div>
        </div>
        <div class="row">
          <button type="button" class="btn btn-primary" onClick={this.submit}>
            전송
          </button>
        </div>
      </div>
    );
  }
}

export default SelectTest;
