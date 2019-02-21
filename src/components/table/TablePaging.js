import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Api from '../../utils/Api';
import classNames from 'classnames';

@withRouter
@inject('appStore')
@observer
class TablePaging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      pageSize: 10,
      displayMaxPageCount: 5,
      totalCount: null,
      totalPageSize: null,
      displayPageInfos: [],
      prevPage: null,
      nextPage: null
    };
    this.refresh = this.refresh.bind(this);
    this.goPage = this.goPage.bind(this);
    this.goLastPage = this.goLastPage.bind(this);
    this.goFirstPage = this.goFirstPage.bind(this);
  }

  refresh() {
    Api.get('tableScroll', {
      params: { page: this.state.currentPage, pageSize: this.state.pageSize }
    }).then(result => {
      let data = result.data.data;
      let totalCount = result.data.totalCount;
      let totalPageSize = Math.ceil(totalCount / this.state.pageSize);
      // displayMaxPageCount 기준 현재 page step
      let currentPageStep = Math.floor(
        this.state.currentPage / this.state.displayMaxPageCount
      );
      if (this.state.currentPage % this.state.displayMaxPageCount !== 0) {
        currentPageStep = currentPageStep + 1;
      }
      let pageInfoStartIndex =
        currentPageStep * this.state.displayMaxPageCount -
        (this.state.displayMaxPageCount - 1);
      let pageInfoLastIndex =
        currentPageStep * this.state.displayMaxPageCount <= totalPageSize
          ? currentPageStep * this.state.displayMaxPageCount
          : totalPageSize;
      let displayPageInfos = [];
      for (
        let pageInfoIndex = pageInfoStartIndex;
        pageInfoIndex <= pageInfoLastIndex;
        pageInfoIndex++
      ) {
        displayPageInfos.push(pageInfoIndex);
      }
      let lastPageStep = Math.ceil(
        totalPageSize / this.state.displayMaxPageCount
      );
      let isNextPageStep = currentPageStep < lastPageStep;
      let nextPage = isNextPageStep
        ? currentPageStep * this.state.displayMaxPageCount + 1
        : null;

      let isPrevPageStep = currentPageStep > 1;
      let prevPage = isPrevPageStep
        ? (currentPageStep - 2) * this.state.displayMaxPageCount + 1
        : null;

      // 최종 state 처리
      this.setState({
        data: data,
        totalCount: totalCount,
        totalPageSize: totalPageSize,
        displayPageInfos: displayPageInfos,
        prevPage: prevPage,
        nextPage: nextPage
      });
    });
  }

  goPage(pageIndex) {
    if (pageIndex) {
      this.setState(
        {
          currentPage: pageIndex
        },
        () => {
          this.refresh();
        }
      );
    }
  }

  goFirstPage() {
    if (this.state.prevPage) {
      this.goPage(1);
    }
  }

  goLastPage() {
    if (this.state.nextPage) {
      this.goPage(Math.ceil(this.state.totalCount / this.state.pageSize));
    }
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">index</th>
              <th scope="col">name</th>
              <th scope="col">platform</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(info => {
              return (
                <tr>
                  <td>{info.id}</td>
                  <td>{info.name}</td>
                  <td>{info.platform}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={classNames('page-item', {
                disabled: !this.state.prevPage
              })}
              onClick={this.goFirstPage}
            >
              <a
                className="page-link"
                href="javascript:void(0);"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              className={classNames('page-item', {
                disabled: !this.state.prevPage
              })}
              onClick={() => this.goPage(this.state.prevPage)}
            >
              <a
                className="page-link"
                href="javascript:void(0);"
                aria-label="Previous"
              >
                <span aria-hidden="true">&lsaquo;</span>
              </a>
            </li>

            {this.state.displayPageInfos.map(pageInfoIndex => {
              return (
                <li
                  className={classNames('page-item', {
                    active: pageInfoIndex === this.state.currentPage
                  })}
                  onClick={() => this.goPage(pageInfoIndex)}
                >
                  <a className="page-link" href="javascript:void(0);">
                    {pageInfoIndex}
                  </a>
                </li>
              );
            })}

            <li
              className={classNames('page-item', {
                disabled: !this.state.nextPage
              })}
              onClick={() => this.goPage(this.state.nextPage)}
            >
              <a
                className="page-link"
                href="javascript:void(0);"
                aria-label="Next"
              >
                <span aria-hidden="true">&rsaquo;</span>
              </a>
            </li>
            <li
              className={classNames('page-item', {
                disabled: !this.state.nextPage
              })}
              onClick={this.goLastPage}
            >
              <a
                className="page-link"
                href="javascript:void(0);"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default TablePaging;
