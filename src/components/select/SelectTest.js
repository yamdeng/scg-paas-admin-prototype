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
    let defaultSelect1Data = { value: 'chocolate', label: 'Chocolate' };
    let defaultSelect2Data = [
      {
        id: '1A',
        value: '1A',
        name: '안용성1',
        label: '안용성1',
        dept: 'scglab'
      },
      {
        id: '1H',
        value: '1H',
        name: '황승연1',
        label: '황승연1',
        dept: 'scglab'
      }
    ];
    this.state = {
      selectedOption: null,
      selectedOption2: defaultSelect2Data,
      select1Data: defaultSelect1Data,
      select2Data: defaultSelect2Data
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.promiseOptions = this.promiseOptions.bind(this);
    this.submit = this.submit.bind(this);
  }

  promiseOptions(inputValue) {
    return new Promise(resolve => {
      setTimeout(() => {
        Api.get('selectSearch', {
          params: { search: inputValue },
          disableLoadingBar: true
        }).then(result => {
          let searchResult = result.data;
          searchResult.forEach(searchInfo => {
            searchInfo.value = searchInfo.id;
            searchInfo.label = searchInfo.name;
          });
          this.setState({ select2Data: searchResult });
          resolve(searchResult);
        });
      }, 1000);
    });
  }

  handleChange(select1Data) {
    this.setState({ select1Data });
  }

  handleChange2(selectedOption2) {
    this.setState({ selectedOption2 });
  }

  submit() {
    let selectedOption = this.state.selectedOption;
    let selectedOption2 = this.state.selectedOption2;
    debugger;
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('SelectTest');
  }

  render() {
    return (
      <div class="container form-test">
        <div class="row">
          <div class="col col-3">select1</div>
          <div class="col col-9">
            <Select
              onChange={this.handleChange}
              options={options}
              value={this.state.select1Data}
            />
          </div>
          <div class="col col-3">select2(ajax)</div>
          <div class="col col-9">
            <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={this.promiseOptions}
              onChange={this.handleChange2}
              value={this.state.selectedOption2}
            />
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
