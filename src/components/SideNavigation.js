import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

const menuMappingInfos = [
  { title: '홈', linkUrl: '/home' },
  { title: 'material-date', linkUrl: '/material-date' }
];

@withRouter
@inject('appStore', 'companyStore')
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
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#/home">
          Home
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
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
                  <li class="nav-item active" style={linkStyle}>
                    {info.title}
                  </li>
                </Link>
              );
            })}

            {/* <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link disabled"
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
