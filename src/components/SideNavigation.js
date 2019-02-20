import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

const menuMappingInfos = [
  { title: '홈', linkUrl: '/home', success: true },
  { title: '아코디언 부트스트랩', linkUrl: '/accordion-b', success: true },
  {
    title: '아코디언 메트리얼',
    linkUrl: '/accordion-m?aa=aa&bb=bb',
    success: true,
    checkLogin: true
  }
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
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>관리자 이슈 테스트</h3>
        </div>
        <ul className="list-unstyled components">
          <Link
            className="nav-link"
            to={'/home'}
            onClick={this.clickMenu}
            key={'home'}
          >
            home
          </Link>
          <Link
            className="nav-link"
            to={'/login'}
            onClick={this.clickMenu}
            key={'login'}
          >
            home
          </Link>
          <li className="active">
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Home
            </a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
              <li>
                <a href="#">Home 1</a>
              </li>
              <li>
                <a href="#">Home 2</a>
              </li>
              <li>
                <a href="#">Home 3</a>
              </li>
            </ul>
          </li>
          <li>
            {/* <a href="#">About</a> */}
            <Link
              className="nav-link"
              to={'/signup'}
              onClick={this.clickMenu}
              key={'signup'}
            >
              signup
            </Link>
          </li>
          <li>
            <a
              href="#pageSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Pages
            </a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li>
                <a href="#">Page 1</a>
              </li>
              <li>
                <a href="#">Page 2</a>
              </li>
              <li>
                <a href="#">Page 3</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">signup</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideNavigation;
