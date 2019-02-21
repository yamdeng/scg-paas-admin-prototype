import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Api from '../../utils/Api';

@withRouter
@inject('appStore')
@observer
class TablePaging extends React.Component {
  /*
   
    totalCount : 110, pageSize : 10, displayMaxPageCount : 5

    1.totalCount
    2.pageSize
    3.displayMaxPageCount
    4.currentPage
    5.totalPageSize
    6.prevPage
    7.nextPage
    8.firstPage
    9.lastPage

    106 ~ 120 / 21,154

    currentPage 1 ~ 

    displayPageInfos : []
     -totalCount가 0보다 큰 경우에만 처리
     -currentPage 1 ~ 5, 6 ~ 10, 11 ~ 15
     10 < 
     60 < 
    
     49, 50, 51
     
     Math.floor 사용
     11 * 10 / 5 * 10 : 2.1 ---> 2
     6 * 10 / 5 * 10 : 1.0 ---> 1
     5 * 10 / 5 * 10 : 1 ---> 0
     5 * 10 % 5 * 10 === 0이면 -1
     currentPage * pageSize / displayMaxPageCount * pageSize

     displayMaxPageCount * 0(측정변수) + 1 ~ displayMaxPageCount * (0 + 1) : 마지막 구간은 totalPageSize 보다 큰 경우에만 적용함
     displayMaxPageCount * 1(측정변수) + 1 ~ displayMaxPageCount * (1 + 1) : 마지막 구간은 totalPageSize 보다 큰 경우에만 적용함

    다음 페이지가 존재하는지?
     -currentPage / displayMaxPageCount === totalPageSize / displayMaxPageCount
     -1 / 5 === 11 / 5 ---> 6
     -5 / 5 === 11 / 5 ---> 6
     -6 / 5 === 11 / 5 ---> 11
     -10 / 5 === 11 / 5 ---> 11
     -11 / 5 === 11 / 5 ---> X

     let currentPageStep = Math.floor(currentPage / displayMaxPageCount);
     if(currentPage % displayMaxPageCount !== 0) {
       currentPageStep = currentPageStep + 1;
     }
     let lastPageStep = Math.ceil(totalPageSize / displayMaxPageCount);
     let isNextPageStep = currentPageStep < lastPageStep;
     let nextPage = isNextPageStep ? (currentPageStep * displayMaxPageCount + 1) : null;

    이전 페이지가 존재하는가?
    let currentPageStep = Math.floor(currentPage / displayMaxPageCount);
    if(currentPage % displayMaxPageCount !== 0) {
      currentPageStep = currentPageStep + 1;
    }
    let isPrevPageStep = currentPageStep > 1;
    let prevPage = isPrevPageStep ? (currentPageStep - 2) * displayMaxPageCount + 1 : null;


    처음 페이지가 존재하는지? ---> goPage(1)

    마지막 페이지가 존재하는가? ---> Math.ceil(totalCount / pageSize) 



    활성화여부
    <(prevPage) : 비활성화
     1.현재 page * pageSize : 60, displayPageCount(5) * pageSize = 50


    <<(firstPage) : 비활성화
    >(nextPage) : 활성화
    >>(lastPage) : 활성화

  */

  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    Api.get('tableScroll').then(result => {
      this.setState({ data: result.data.data });
    });
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
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&lsaquo;</span>
              </a>
            </li>

            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>

            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&rsaquo;</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
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
