import { observable, action } from 'mobx';

class UiStore {
  @observable displayLoadingBar = false;

  @observable hideSideNavigation = false;

  @action
  showLoadingBar() {
    this.displayLoadingBar = true;
  }

  @action
  hideLoadingBar() {
    this.displayLoadingBar = false;
  }

  @action
  showNavigation() {
    this.hideSideNavigation = false;
  }

  @action
  hideNavigation() {
    this.hideSideNavigation = true;
  }
}

export default UiStore;
