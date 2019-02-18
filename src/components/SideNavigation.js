import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

const menuMappingInfos = [
  { title: '홈', linkUrl: '/home' },
  { title: 'material-date', linkUrl: '/material-date' }
];

@withRouter
@inject('appStore', 'companyStore', 'uiStore')
@observer
class SideNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <nav
        className={classNames(
          'navbar',
          'navbar-expand-lg',
          'navbar-light',
          'bg-light',
          {
            none: this.props.uiStore.hideSideNavigation
          }
        )}
      >
        <a className="navbar-brand" href="#/home">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {menuMappingInfos.map(info => {
              let linkStyle = {};
              if (
                info.checkLogin &&
                this.props.appStore.loginInfo.contractNumber
              ) {
                linkStyle = { display: 'none' };
              }
              return (
                <Link
                  className="nav-link"
                  to={info.linkUrl}
                  onClick={this.clickMenu}
                  key={info.title}
                  style={linkStyle}
                >
                  <li className="nav-item active" style={linkStyle}>
                    {info.title}
                  </li>
                </Link>
              );
            })}

            {/* <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li> */}
          </ul>
        </div>
      </nav>
    );
  }
}

export default SideNavigation;
