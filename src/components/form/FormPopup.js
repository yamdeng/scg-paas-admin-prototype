import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import AppHistory from '../../utils/AppHistory';

@withRouter
@inject('appStore')
@observer
class FormPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ isOpen: false });
    AppHistory.push('/form/detail');
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.closeModal}>
          <ModalBody>
            <p>modal huhu</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default FormPopup;
