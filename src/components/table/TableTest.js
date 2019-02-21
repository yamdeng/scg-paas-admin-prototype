import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Api from '../../utils/Api';

@withRouter
@inject('appStore')
@observer
class TableTest extends React.Component {
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
        <table class="table">
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
      </div>
    );
  }
}

export default TableTest;
