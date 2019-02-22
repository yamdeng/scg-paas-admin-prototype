import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import Api from '../../utils/Api';

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
    this.state = {
      selectedOption: null,
      selectedOption2: null,
      select2Data: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }

  handleChange2(selectedOption2) {
    this.setState({ selectedOption2 });
  }

  onInputChange(inputValue, action) {
    // debugger;
    // Api.get('selectSearch', { params: { search: inputValue } }).then(result => {
    //   this.setState({ select2Data: result.data.data });
    // });
    if (action === 'input-change') {
      debugger;
      Api.get('selectSearch', { params: { search: inputValue } }).then(
        result => {
          this.setState({ select2Data: result.data.data });
        }
      );
    }
  }

  submit() {}

  componentDidMount() {
    this.props.appStore.changeHeadTitle('SelectTest');
  }

  render() {
    const { selectedOption, selectedOption2 } = this.state;
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
          <div class="col col-3">select2(ajax)</div>
          <div class="col col-9">
            {/* <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={promiseOptions}
            /> */}
          </div>
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
