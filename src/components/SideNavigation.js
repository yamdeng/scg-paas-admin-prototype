import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

const menuMappingInfos = [
  { title: '홈', linkUrl: '/home' },
  {
    title: '테이블',
    linkUrl: '',
    childId: 'table',
    child: [
      { title: '테스트', linkUrl: '/table/test' },
      { title: '페이징', linkUrl: '/table/paging' },
      { title: '검색/정렬', linkUrl: '/table/filter' }
    ]
  },
  {
    title: '폼',
    linkUrl: '',
    childId: 'form',
    child: [
      { title: '상세/popup', linkUrl: '/form/detail' },
      { title: '등록/수정', linkUrl: '/form/create' }
    ]
  },
  {
    title: '파일업로드',
    linkUrl: '/fileupload'
  },
  {
    title: 'color 컴포넌트',
    linkUrl: '',
    childId: 'color',
    child: [{ title: '테스트', linkUrl: '/color/test' }]
  },
  {
    title: 'select 컴포넌트',
    linkUrl: '',
    childId: 'select',
    child: [{ title: '테스트', linkUrl: '/select/test' }]
  },
  {
    title: '에디터',
    linkUrl: '',
    childId: 'editor',
    child: [
      { title: 'ckeditor', linkUrl: '/editor/ckeditor' },
      { title: 'summernote', linkUrl: '/editor/summernote' }
    ]
  },
  {
    title: '로그인',
    linkUrl: '/login'
  },
  {
    title: '회원가입',
    linkUrl: '/signup'
  },
  {
    title: '드래그앤드랍',
    linkUrl: '',
    childId: 'dragdrop',
    child: [
      { title: '테스트', linkUrl: '/dragdrop/test' },
      { title: '서버', linkUrl: '/dragdrop/server' }
    ]
  },
  {
    title: '달력컴포넌트',
    linkUrl: '',
    childId: 'calendar',
    child: [
      { title: 'rc-calendar', linkUrl: '/calendar/rc' },
      { title: 'rc-calendar-final', linkUrl: '/calendar/final' },
      { title: 'date-range', linkUrl: '/calendar/date-range' }
    ]
  },
  {
    title: '로컬 네비게이션',
    linkUrl: '/네비게이션'
  },
  {
    title: '로딩바, noti, alert, confirm',
    linkUrl: '/alert'
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
    this.clickMenu = this.clickMenu;
  }

  clickMenu() {}

  render() {
    // let menuMappingInfos = menuMappingInfos;
    let menuMappingInfos = this.props.companyStore.menuInfo;
    return (
      <nav
        id="sidebar"
        className={classNames({
          active: this.props.uiStore.hideSideNavigation
        })}
      >
        <div className="sidebar-header">
          <h3>
            {this.props.appStore.loginInfo
              ? this.props.appStore.loginInfo.name +
                '(' +
                this.props.appStore.loginInfo.login_id +
                ')'
              : null}
          </h3>
        </div>
        <ul className="list-unstyled components">
          {menuMappingInfos.map(menuInfo => {
            let menuComponent = null;
            if (menuInfo.child && menuInfo.child.length) {
              menuComponent = (
                <li className="active" key={menuInfo.title}>
                  <a
                    href={'#' + menuInfo.childId}
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    {menuInfo.title}
                  </a>
                  <ul className="collapse list-unstyled" id={menuInfo.childId}>
                    {menuInfo.child.map(childMenuInfo => {
                      let childMenuComponent = (
                        <Link
                          className="nav-link"
                          to={childMenuInfo.linkUrl}
                          onClick={this.clickMenu}
                          key={childMenuInfo.title}
                        >
                          {childMenuInfo.title}
                        </Link>
                      );
                      return childMenuComponent;
                    })}
                  </ul>
                </li>
              );
            } else {
              menuComponent = (
                <Link
                  className="nav-link"
                  to={menuInfo.linkUrl}
                  onClick={this.clickMenu}
                  key={menuInfo.title}
                >
                  {menuInfo.title}
                </Link>
              );
            }
            return menuComponent;
          })}
        </ul>
      </nav>
    );
  }
}

export default SideNavigation;
