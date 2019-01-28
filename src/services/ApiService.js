// eslint-disable-next-line
import stores from '../stores/stores';
import Api from '../utils/Api';

class ApiService {
  get(url, config) {
    return Api.get(stores.companyStore.companyCode + '/' + url, config);
  }

  post(url, data, config) {
    return Api.post(stores.companyStore.companyCode + '/' + url, data, config);
  }

  delete(url, config) {
    return Api.delete(stores.companyStore.companyCode + '/' + url, config);
  }

  put(url, data, config) {
    return Api.put(stores.companyStore.companyCode + '/' + url, data, config);
  }

  patch(url, data, config) {
    return Api.patch(stores.companyStore.companyCode + '/' + url, data, config);
  }
}

export default new ApiService();
