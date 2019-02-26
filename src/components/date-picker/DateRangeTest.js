import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import Config from '../../config/Config';
moment.locale('ko');

const locale = {
  format: Config.dateDisplayFormat,
  separator: ' - ',
  applyLabel: '적용',
  cancelLabel: '취소',
  fromLabel: 'From',
  toLabel: 'To',
  customRangeLabel: 'Custom',
  weekLabel: '주',
  daysOfWeek: ['일', '월', '화', '수', '목', '굼', '토'],
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  firstDay: 1
};

@withRouter
@inject('appStore')
@observer
class DateRangeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      singleValue: null,
      rangeValue: null,
      startDate: null,
      endDate: null
    };
    this.clickButton = this.clickButton.bind(this);
    this.singleTextInputRef = React.createRef();
    this.rangeTextInputRef = React.createRef();
    this.applySingleDatePicker = this.applySingleDatePicker.bind(this);
    this.applyRangeDatePicker = this.applyRangeDatePicker.bind(this);
    this.clearRangeDatePicker = this.clearRangeDatePicker.bind(this);
  }

  clickButton() {
    this.singleTextInputRef.current.click();
  }

  applySingleDatePicker(start, end, label) {
    this.setState({ singleValue: start.format(Config.dateDisplayFormat) });
  }

  applyRangeDatePicker(start, end, label) {
    this.setState({
      startDate: start.format(Config.dateDisplayFormat),
      endDate: end.format(Config.dateDisplayFormat),
      rangeValue:
        start.format(Config.dateDisplayFormat) +
        '-' +
        end.format(Config.dateDisplayFormat)
    });
  }

  clearRangeDatePicker(event, picker) {
    this.setState({
      startDate: null,
      endDate: null,
      rangeValue: ''
    });
  }

  componentDidMount() {
    // single date picker start
    $('input[name="singledate"]').daterangepicker(
      {
        opens: 'center',
        startDate: null,
        singleDatePicker: true,
        autoApply: false,
        autoUpdateInput: false,
        locale: locale
      },
      this.applySingleDatePicker
    );

    $('input[name="singledate"]')
      .data('daterangepicker')
      .setStartDate(
        moment()
          .clone()
          .add(1, 'days')
          .format(Config.dateDisplayFormat)
      );

    this.setState({
      singleValue: moment()
        .clone()
        .add(1, 'days')
        .format(Config.dateDisplayFormat)
    });

    // single date picker end

    // range date picker start
    $('input[name="rangedate"]').daterangepicker(
      {
        opens: 'right',
        autoApply: false,
        autoUpdateInput: false,
        locale: locale
      },
      this.applyRangeDatePicker
    );

    $('input[name="rangedate"]')
      .data('daterangepicker')
      .setStartDate(moment().format(Config.dateDisplayFormat));

    $('input[name="rangedate"]')
      .data('daterangepicker')
      .setEndDate(
        moment()
          .clone()
          .add(3, 'days')
          .format(Config.dateDisplayFormat)
      );

    this.setState({
      rangeValue:
        moment().format(Config.dateDisplayFormat) +
        '-' +
        moment()
          .clone()
          .add(1, 'days')
          .format(Config.dateDisplayFormat)
    });

    $('input[name="rangedate"]').on(
      'cancel.daterangepicker',
      this.clearRangeDatePicker
    );

    // range date picker end
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <input
            type="text"
            style={{ width: 300 }}
            name="singledate"
            ref={this.singleTextInputRef}
            value={this.state.singleValue}
            placeholder="날짜를 선택해주세요"
          />
        </div>
        <div>
          <input
            type="text"
            style={{ width: 300 }}
            name="rangedate"
            ref={this.rangeTextInputRef}
            value={this.state.rangeValue}
            placeholder="날짜를 선택해주세요"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default DateRangeTest;
