import React from 'react';

import Logger from '../../utils/Logger';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import koKR from 'rc-calendar/lib/locale/ko_KR';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';
import 'moment/locale/ko';
moment.locale('ko');

const format = 'YYYY-MM-DD HH:mm:ss';

const now = moment();

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = (
  <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />
);

function disabledTime(date) {
  Logger.log('disabledTime', date);
  if (date && date.date() === 15) {
    return {
      disabledHours() {
        return [3, 4];
      }
    };
  }
  return {
    disabledHours() {
      return [1, 2];
    }
  };
}

function disabledDate(current) {
  Logger.log('disabledDate : ' + moment(current.valueOf()).format('YYYYMMDD'));
  if (!current) {
    // allow empty select
    return false;
  }
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.valueOf() < date.valueOf(); // can not select days before today
}

@withRouter
@inject('appStore')
@observer
class RcDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTime: true,
      showDateInput: true,
      disabled: false,
      value: props.defaultValue
    };
  }

  onChange = value => {
    Logger.log('DatePicker change: ', value && value.format(format));
    this.setState({
      value
    });
  };

  onShowTimeChange = e => {
    this.setState({
      showTime: e.target.checked
    });
  };

  onShowDateInputChange = e => {
    this.setState({
      showDateInput: e.target.checked
    });
  };

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };

  componentDidMount() {
    this.props.appStore.changeHeadTitle('RcDatePicker');
  }

  render() {
    return (
      <div>
        {/* <div style={{ margin: 10 }}>
          <Calendar
            showWeekNumber={false}
            locale={koKR}
            defaultValue={now}
            disabledTime={disabledTime}
            showToday
            format={getFormat(true)}
            showOk={false}
            timePicker={timePickerElement}
            onChange={onStandaloneChange}
            disabledDate={disabledDate}
            onSelect={onStandaloneSelect}
            renderFooter={mode => null}
          />
        </div> */}
        <div style={{ float: 'left', width: 300 }}>
          <Demo defaultValue={now} />
        </div>
        {/* <div style={{ float: 'right', width: 300 }}>
          <Demo defaultCalendarValue={defaultCalendarValue} />
        </div>
        <div style={{ clear: 'both' }} />
        <div>
          <DemoMultiFormat />
        </div> */}
      </div>
    );
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTime: true,
      showDateInput: true,
      disabled: false,
      value: props.defaultValue
    };
  }

  onChange = value => {
    Logger.log('DatePicker change: ', value && value.format(format));
    this.setState({
      value
    });
  };

  onShowTimeChange = e => {
    this.setState({
      showTime: e.target.checked
    });
  };

  onShowDateInputChange = e => {
    this.setState({
      showDateInput: e.target.checked
    });
  };

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };

  render() {
    const state = this.state;
    const calendar = (
      <Calendar
        locale={koKR}
        style={{ zIndex: 1000 }}
        dateInputPlaceholder="please input"
        format={getFormat(state.showTime)}
        disabledTime={state.showTime ? disabledTime : null}
        timePicker={state.showTime ? timePickerElement : null}
        defaultValue={this.props.defaultCalendarValue}
        showDateInput={state.showDateInput}
        disabledDate={disabledDate}
      />
    );
    return (
      <div style={{ width: 400, margin: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>
            <input
              type="checkbox"
              checked={state.showTime}
              onChange={this.onShowTimeChange}
            />
            showTime
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="checkbox"
              checked={state.showDateInput}
              onChange={this.onShowDateInputChange}
            />
            showDateInput
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input
              checked={state.disabled}
              onChange={this.toggleDisabled}
              type="checkbox"
            />
            disabled
          </label>
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            position: 'relative',
            display: 'block',
            lineHeight: 1.5,
            marginBottom: 22
          }}
        >
          <DatePicker
            animation="slide-up"
            calendar={calendar}
            value={state.value}
            onChange={this.onChange}
          >
            {({ value }) => {
              return (
                <span tabIndex="0" className="rc-date">
                  <input
                    placeholder="please select"
                    style={{ width: 250 }}
                    disabled={state.disabled}
                    readOnly
                    tabIndex="-1"
                    className="ant-calendar-picker-input ant-input"
                    value={
                      (value && value.format(getFormat(state.showTime))) || ''
                    }
                  />
                  <input type="button" />
                </span>
              );
            }}
          </DatePicker>
        </div>
      </div>
    );
  }
}

export default RcDatePicker;
