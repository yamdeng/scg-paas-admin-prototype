import { observable, action, runInAction } from 'mobx';
import Api from '../../utils/Api';

class RestCommonDomain {
  @observable
  apiUri = '';

  @observable
  data = [];

  @observable
  detailData = {};

  constructor(apiUri) {
    this.apiUri = apiUri;
  }

  @action
  clear() {
    this.data = [];
    this.detailData = {};
  }

  @action
  initFormData(initInfo) {
    this.detailData = initInfo;
  }

  @action
  getDetail(detailId) {
    Api.get(this.apiUri + '/' + detailId).then(result => {
      runInAction('RestCommonDomain getDetail', () => {
        this.detailData = result.data;
      });
    });
  }

  @action
  delete(detailId) {
    return Api.delete(this.apiUri + '/' + detailId).then(result => {
      runInAction('RestCommonDomain delete', () => {
        this.detailData = {};
      });
      return result;
    });
  }

  @action
  deleteIds(detailIds) {}

  @action
  create(newInfo) {
    this.detailData = newInfo;
    return this.detailData;
  }

  @action
  update(detailId, updateInfo) {
    this.detailData = updateInfo;
    return this.detailData;
  }

  @action
  search(params) {
    Api.get(this.apiUri, {
      params: params
    }).then(result => {
      runInAction('RestCommonDomain search', () => {
        this.data = result.data;
      });
    });
  }
}
export default RestCommonDomain;
