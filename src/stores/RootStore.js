import AppStore from './AppStore';
import UiStore from './UiStore';
import TestStore from './TestStore';
import CompanyStore from './CompanyStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.uiStore = new UiStore(this);
    this.testStore = new TestStore(this, 'tableScroll');
    this.companyStore = new CompanyStore(this);
  }
}

export default RootStore;
