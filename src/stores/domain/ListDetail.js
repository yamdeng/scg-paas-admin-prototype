import { observable, action } from 'mobx';

class ListDetail {
  @observable id = null;
  @observable name = '';

  constructor(info) {
    this.id = info.id;
    this.name = info.name;
  }

  @action
  changeName(name) {
    this.name = name;
  }

  @action
  changeInfo(info) {
    this.id = info.id;
    this.name = info.name;
  }
}

export default ListDetail;
