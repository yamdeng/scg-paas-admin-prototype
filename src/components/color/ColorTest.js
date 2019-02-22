import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { SketchPicker } from 'react-color';

@withRouter
@inject('appStore')
@observer
class ColorTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayColorPicker: false, color: '#000' };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChange(color) {
    this.setState({ color: color.hex });
  }

  submit() {
    let color = this.state.color;
    debugger;
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('Color 테스트');
  }

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2'
    };
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    };
    return (
      <div class="container form-test">
        <div class="row">
          <div class="col col-3">라벨1</div>
          <div class="col col-9">
            <span
              style={{ background: this.state.color, padding: 5 }}
              onClick={this.handleClick}
            />
            {this.state.displayColorPicker ? (
              <div style={popover}>
                <div style={cover} onClick={this.handleClose} />
                <SketchPicker
                  color={this.state.color}
                  onChange={this.handleChange}
                />
              </div>
            ) : null}
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

export default ColorTest;
