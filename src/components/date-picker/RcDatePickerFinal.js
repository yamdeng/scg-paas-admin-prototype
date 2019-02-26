import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
// import koKR from 'rc-calendar/lib/locale/ko_KR';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';
import 'moment/locale/ko';
import Config from '../../config/Config';
import Logger from '../../utils/Logger';
moment.locale('ko');

const koKR = {
  today: '오늘',
  now: '현재 시각',
  backToToday: '오늘로 돌아가기',
  ok: '확인',
  clear: '지우기',
  month: '월',
  year: '년',
  timeSelect: '시간 선택',
  dateSelect: '날짜 선택',
  monthSelect: '달 선택',
  yearSelect: '연 선택',
  decadeSelect: '연대 선택',
  yearFormat: 'YYYY년',
  dateFormat: 'YYYY-MM-DD',
  dayFormat: 'Do',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  monthBeforeYear: false,
  previousMonth: '이전 달 (PageUp)',
  nextMonth: '다음 달 (PageDown)',
  previousYear: '이전 해 (Control + left)',
  nextYear: '다음 해 (Control + right)',
  previousDecade: '이전 연대',
  nextDecade: '다음 연대',
  previousCentury: '이전 세기',
  nextCentury: '다음 세기'
};

function getFormat(time) {
  return Config.dateDisplayFormat;
}

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

function newArray(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledTime2(time, type) {
  Logger.log('disabledTime', time, type);
  if (type === 'start') {
    return {
      disabledHours() {
        const hours = newArray(0, 60);
        hours.splice(20, 4);
        return hours;
      },
      disabledMinutes(h) {
        if (h === 20) {
          return newArray(0, 31);
        } else if (h === 23) {
          return newArray(30, 60);
        }
        return [];
      },
      disabledSeconds() {
        return [55, 56];
      }
    };
  }
  return {
    disabledHours() {
      const hours = newArray(0, 60);
      hours.splice(2, 6);
      return hours;
    },
    disabledMinutes(h) {
      if (h === 20) {
        return newArray(0, 31);
      } else if (h === 23) {
        return newArray(30, 60);
      }
      return [];
    },
    disabledSeconds() {
      return [55, 56];
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
class RcDatePickerFinal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('RcDatePicker');
  }

  render() {
    return (
      <div>
        <div style={{ float: 'left', width: 300 }}>
          <SingleDatePicker />
        </div>
        <br />
        <br />
        <br />
        <div style={{ margin: 100 }}>
          <RangeDatePicker />
        </div>
      </div>
    );
  }
}

class SingleDatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTime: true,
      showDateInput: true,
      disabled: false,
      value: moment()
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    // let value = this.state.value;
    // let valueString = value.format(Config.dateDisplayFormat);
    debugger;
  }

  onChange = value => {
    Logger.log(
      'DatePicker change: ',
      value && value.format(Config.dateDisplayFormat)
    );
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

  onOk = event => {
    debugger;
  };

  onSelect = (value, event) => {
    // debugger;
    debugger;
    this.setState({ singleDisplayValue: value });
  };

  render() {
    const state = this.state;
    const calendar = (
      <Calendar
        locale={koKR}
        style={{ zIndex: 1000 }}
        dateInputPlaceholder="날짜를 선택해주세요"
        format={getFormat(state.showTime)}
        disabledTime={state.showTime ? disabledTime : null}
        timePicker={state.showTime ? timePickerElement : null}
        defaultValue={this.props.defaultCalendarValue}
        showDateInput={state.showDateInput}
        disabledDate={disabledDate}
        showClear={true}
        onOk={this.onOk}
        onChange={this.onSelect}
        value={this.state.singleDisplayValue}
        showOk={true}
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
            placement="bottomLeft"
            align={{ offset: [0, 25] }}
            showClear={true}
          >
            {({ value }) => {
              return (
                <span tabIndex="0" className="rc-date">
                  <input
                    placeholder="날짜를 선택해주세요"
                    style={{ width: 500 }}
                    disabled={state.disabled}
                    readOnly
                    tabIndex="-1"
                    className="ant-calendar-picker-input ant-input"
                    value={
                      (value && value.format(getFormat(state.showTime))) || ''
                    }
                  />
                  {/* <input type="button" /> */}
                </span>
              );
            }}
          </DatePicker>
        </div>
        <div class="row">
          <button type="button" class="btn btn-primary" onClick={this.submit}>
            전송1
          </button>
        </div>
      </div>
    );
  }
}

function isValidRange(v) {
  return v && v[0] && v[1];
}

class RangeDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [
        moment(),
        moment()
          .clone()
          .add(1, 'days')
      ],
      hoverValue: []
    };
    this.submit = this.submit.bind(this);
  }

  onChange = value => {
    Logger.log('onChange : ' + value);
    this.setState({ value });
  };

  onHoverChange = hoverValue => {
    this.setState({ hoverValue });
  };

  submit() {
    let value = this.state.value;
    if (value.length > 1) {
      // let startString = value[0].format(Config.dateDisplayFormat);
      // let endString = value[1].format(Config.dateDisplayFormat);
      debugger;
    }
  }

  render() {
    const state = this.state;
    const calendar = (
      <RangeCalendar
        hoverValue={state.hoverValue}
        onHoverChange={this.onHoverChange}
        showWeekNumber={false}
        dateInputPlaceholder={['시작일', '종료일']}
        locale={koKR}
        disabledTime={disabledTime2}
        timePicker={timePickerElement}
        showToday={true}
        showClear={true}
      />
    );
    return (
      <React.Fragment>
        <DatePicker
          value={state.value}
          onChange={this.onChange}
          animation="slide-up"
          calendar={calendar}
          align={{ offset: [30, 20] }}
          showClear={true}
        >
          {({ value }) => {
            return (
              <span>
                <input
                  placeholder="날짜를 선택해주세요"
                  style={{ width: 350 }}
                  disabled={state.disabled}
                  readOnly
                  className="ant-calendar-picker-input ant-input"
                  value={
                    (isValidRange(value) &&
                      `${value[0].format(
                        Config.dateDisplayFormat
                      )} - ${value[1].format(Config.dateDisplayFormat)}`) ||
                    ''
                  }
                />
              </span>
            );
          }}
        </DatePicker>
        <div class="row">
          <button type="button" class="btn btn-primary" onClick={this.submit}>
            전송2
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default RcDatePickerFinal;
