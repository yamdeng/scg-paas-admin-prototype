import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import AppHistory from '../../utils/AppHistory';

@withRouter
@inject('appStore')
@observer
class FormDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  openModalByRoute() {
    AppHistory.push('/form/detail/popup');
  }

  componentDidMount() {}
  render() {
    return (
      <div class="container form-test">
        <div class="row">
          <div class="col col-3">라벨1</div>
          <div class="col col-9">값1</div>
          <div class="col col-3">라벨2</div>
          <div class="col col-9">값2</div>
          <div class="col col-3">라벨3</div>
          <div class="col col-9">값3</div>
          <div class="col col-3">라벨4</div>
          <div class="col col-9">값4</div>
        </div>
        <div class="row">
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.openModal}
          >
            popup manual
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.openModalByRoute}
          >
            popup route
          </button>
        </div>
        <Modal isOpen={this.state.isOpen} toggle={this.closeModal}>
          <ModalBody>
            <p>modal huhu</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default FormDetail;
