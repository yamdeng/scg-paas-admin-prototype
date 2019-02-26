import DevTools from 'mobx-react-devtools';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import queryString from 'query-string';
import axios from 'axios';
import SideNavigation from './components/SideNavigation';
import Home from './components/Home';
import Login from './Login';
import SignUp from './SignUp';
import LoadingBarContainer from './containers/LoadingBarContainer';
import ErrorBoundary from './components/ErrorBoundary';

import './App.css';
import Logger from './utils/Logger';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import shortid from 'shortid';
import Helper from './utils/Helper';
import Constant from './config/Constant';

import MaterialDatePicker from './components/date-picker/MaterialDatePicker';
import TableTest from './components/table/TableTest';
import TablePaging from './components/table/TablePaging';
import TableFilter from './components/table/TableFilter';
import FormDetail from './components/form/FormDetail';
import FormPopup from './components/form/FormPopup';
import FormEdit from './components/form/FormEdit';
import ColorTest from './components/color/ColorTest';
import SelectTest from './components/select/SelectTest';
import DragDropTest from './components/dragdrop/DragDropTest';
import DragDropServer from './components/dragdrop/DragDropServer';
import RcDatePicker from './components/date-picker/RcDatePicker';
import RcDatePickerFinal from './components/date-picker/RcDatePickerFinal';

@withRouter
@inject('appStore', 'uiStore', 'companyStore')
@observer
class App extends Component {
  historyBlockHandler = null;

  constructor(props) {
    super(props);
    this.state = { displayErrorModal: false, appErrorObject: null };
    this.handleGlobalError = this.handleGlobalError.bind(this);
    this.closeErrorModal = this.closeErrorModal.bind(this);
    this.copyToClipboardByTextArea = this.copyToClipboardByTextArea.bind(this);
    this.toggleNavigation = this.toggleNavigation.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleNavigation() {
    if (this.props.uiStore.hideSideNavigation) {
      this.props.uiStore.showNavigation();
    } else {
      this.props.uiStore.hideNavigation();
    }
  }

  handleGlobalError(message, url, lineNumber, column, errorObject) {
    if (errorObject && typeof errorObject === 'string') {
      errorObject = {
        message: errorObject
      };
    }
    let displayErrorMessage = '';
    displayErrorMessage = displayErrorMessage + 'url : ' + url + '\n';
    displayErrorMessage =
      displayErrorMessage + 'lineNumber : ' + lineNumber + '\n';
    displayErrorMessage = displayErrorMessage + 'column : ' + column + '\n';
    displayErrorMessage =
      displayErrorMessage +
      'message : ' +
      (errorObject && errorObject.message
        ? errorObject.message
        : 'NO MESSAGE') +
      '\n';
    errorObject = errorObject || {};
    errorObject.message = displayErrorMessage;
    let appErrorObject = { message: errorObject.message };
    if (errorObject.stack) {
      appErrorObject.statck = errorObject.stack;
    }
    appErrorObject.errorType =
      errorObject.errorType || Constant.ERROR_TYPE_CORE;
    if (process.env.APP_ENV === Constant.APP_ENV_DEVELOPMENT) {
      this.setState({
        displayErrorModal: true,
        appErrorObject: appErrorObject
      });
    }
    Logger.error('appErrorObject : ' + JSON.stringify(appErrorObject));
    return false;
  }

  copyToClipboardByTextArea(textAreaId) {
    Helper.copyToClipboard(textAreaId);
  }

  closeErrorModal() {
    this.setState({ displayErrorModal: false });
  }

  init() {
    Logger.info('App init call');
    Logger.info('process.env : ' + JSON.stringify(process.env));
    window.onerror = this.handleGlobalError;
    // let location = this.props.location;
    // location.pathname ---> 공통 권한 체크 유틸로 처리하기
    this.historyBlockHandler = this.props.history.block((location, action) => {
      Logger.info('on route block');
      return true;
    });
  }

  logout() {
    Helper.removeInfoByLocalStorage('authToken');
    window.location.href = '/#/?appType=login';
    window.location.reload();
  }

  componentDidMount() {
    this.init();
    let search = this.props.location.search;
    let urlQuery = queryString.parse(search);
    if (urlQuery && urlQuery.checkLogin === 'true') {
      // config.headers.authorization
      let authToken = Helper.getInfoByLocalStorage('authToken');
      axios
        .get('/api/loginUserInfo', {
          headers: { authorization: authToken }
        })
        .then(result => {
          let loginInfo = result.data.loginInfo;
          this.props.appStore.setLoginInfo(loginInfo);
          this.props.companyStore.setCompanyCode(loginInfo.company);
        })
        .catch(error => {
          window.location.href = '/#/?appType=login';
          window.location.reload();
        });
    }
  }

  componentWillUnmount() {
    if (this.historyBlockHandler) {
      this.historyBlockHandler();
    }
  }

  render() {
    let mainContainerStyle = { marginTop: 0 };
    let errorObjectConvertString = '';
    if (this.state.appErrorObject) {
      errorObjectConvertString = JSON.stringify(this.state.appErrorObject);
    }
    let textAreaId = shortid.generate();
    let DEV_TOOL_COMPONENT = null;
    if (process.env.APP_ENV === Constant.APP_ENV_DEVELOPMENT) {
      // DEV_TOOL_COMPONENT = <DevTools />;
    }

    return (
      <ErrorBoundary>
        <div className="wrapper">
          {DEV_TOOL_COMPONENT}
          <SideNavigation />
          <div
            style={mainContainerStyle}
            id="content"
            className={classNames({
              active: this.props.uiStore.hideSideNavigation
            })}
          >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <button
                  type="button"
                  id="sidebarCollapse"
                  className="btn btn-info"
                  onClick={this.toggleNavigation}
                >
                  <i className="fas fa-align-left" />
                </button>
                <button
                  className="btn btn-dark d-inline-block d-lg-none ml-auto"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="fas fa-align-justify" />
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="nav navbar-nav ml-auto">
                    {this.props.appStore.loginInfo ? (
                      <li className="nav-item active">
                        <a
                          className="nav-link"
                          href="javascript:void(0);"
                          onClick={this.logout}
                        >
                          로그아웃
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
            </nav>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/material-date" component={MaterialDatePicker} />
            <Route exact path="/table/test" component={TableTest} />
            <Route exact path="/table/paging" component={TablePaging} />
            <Route exact path="/table/filter" component={TableFilter} />
            <Route path="/form/detail" component={FormDetail} />
            <Route exact path="/form/detail/popup" component={FormPopup} />
            <Route exact path="/form/create" component={FormEdit} />
            <Route exact path="/color/test" component={ColorTest} />
            <Route exact path="/select/test" component={SelectTest} />
            <Route exact path="/dragdrop/test" component={DragDropTest} />
            <Route exact path="/dragdrop/server" component={DragDropServer} />
            <Route exact path="/calendar/rc" component={RcDatePicker} />
            <Route exact path="/calendar/final" component={RcDatePickerFinal} />
          </div>
          {/* {라우팅 설정 end} */}
          <LoadingBarContainer />
          <Modal
            isOpen={this.state.displayErrorModal}
            toggle={this.closeErrorModal}
            id="modalContainer"
          >
            <ModalHeader toggle={this.closeErrorModal}>에러모달</ModalHeader>
            <ModalBody>
              {/* {errorObjectConvertString} */}
              <textarea
                id={textAreaId}
                value={errorObjectConvertString}
                onChange={() => {}}
                style={{
                  display: 'block',
                  opacity: 0,
                  width: '0px',
                  height: '0px'
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={event => this.copyToClipboardByTextArea(textAreaId)}
              >
                에러 복사
              </Button>
              <Button color="primary" onClick={this.closeErrorModal}>
                닫기
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
