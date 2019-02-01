import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import MoreIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import Logger from '../../utils/Logger';

@withRouter
@inject('appStore')
@observer
class MaterialDatePicker extends React.Component {
  state = {
    selectedDate: new Date(),
    anchorEl: null,
    currentLocale: 'fr'
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date.toDate() });
  };

  handleMenuOpen = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  selectLocale = selectedLocale => {
    moment.locale(selectedLocale);
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null
    });
  };

  render() {
    const { selectedDate } = this.state;
    const locale = 'ko';

    return (
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        locale={locale}
        moment={moment}
      >
        <div className="picker">
          <DatePicker
            keyboard
            value={selectedDate}
            onChange={this.handleDateChange}
            disablePast={false}
            disableFuture={false}
            renderDay2={(date, selectedDate, dayInCurrentMonth) => {
              // debugger;
              return <span onClick={() => Logger.info('')}>a</span>;
            }}
            shouldDisableDate={date => {
              // 주말을 걸러낼수 있음
              Logger.info('shouldDisableDate : ' + date._d.getDay());
              return false;
            }}
            minDate="2019-01-01"
            maxDate="2020-01-01"
            InputProps2={{
              endAdornment: (
                <IconButton
                  aria-label="Select locale"
                  onClick={this.handleMenuOpen}
                  aria-owns={this.state.anchorEl ? 'locale-menu' : null}
                >
                  <MoreIcon />
                </IconButton>
              )
            }}
            showTodayButton
            todayLabel="오늘"
            okLabel="확인"
            cancelLabel="취소"
            format="YYYY-MM-DD"
          />
          <DatePicker
            keyboard
            value={selectedDate}
            onChange={this.handleDateChange}
            disablePast={false}
            disableFuture={false}
            renderDay2={(date, selectedDate, dayInCurrentMonth) => {
              // debugger;
              return <span onClick={() => Logger.info('')}>a</span>;
            }}
            shouldDisableDate={date => {
              // 주말을 걸러낼수 있음
              Logger.info('shouldDisableDate : ' + date._d.getDay());
              return false;
            }}
            minDate="2019-01-01"
            maxDate="2020-01-01"
            InputProps2={{
              endAdornment: (
                <IconButton
                  aria-label="Select locale"
                  onClick={this.handleMenuOpen}
                  aria-owns={this.state.anchorEl ? 'locale-menu' : null}
                >
                  <MoreIcon />
                </IconButton>
              )
            }}
            showTodayButton
            todayLabel="오늘"
            okLabel="확인"
            cancelLabel="취소"
            format="YYYY-MM-DD"
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default MaterialDatePicker;
