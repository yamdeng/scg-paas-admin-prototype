import { observable, action } from 'mobx';

class UiStore {
  @observable displayLoadingBar = false;

  @action
  showLoadingBar() {
    this.displayLoadingBar = true;
  }

  @action
  hideLoadingBar() {
    this.displayLoadingBar = false;
  }
}

export default UiStore;
