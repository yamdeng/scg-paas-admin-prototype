import CommonStoreInterface from './CommonStoreInterface';

class TestStore extends CommonStoreInterface {
  constructor(rootStore, apiUri) {
    super(apiUri);
    this.rootStore = rootStore;
  }
  search(params) {
    if (this.data.length === 0) {
      super.search(params);
    }
  }
}

export default TestStore;
