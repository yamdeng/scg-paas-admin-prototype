import { observable, action } from 'mobx';
import Config from '../config/Config';
import CompanyInfo from './company/company';
import MenuInfo from './company/menu';
import ConfigInfo from './company/config';
import _ from 'lodash';

class CompanyStore {
  @observable companyCode = Config.defaultCompanyCode;
  @observable companyInfo = {};
  @observable menuInfo = [];
  @observable configInfo = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.companyInfo = CompanyInfo[this.companyCode];
    this.menuInfo = MenuInfo[this.companyCode];
    this.configInfo = ConfigInfo[this.companyCode];
  }

  @action
  setCompanyCode(companyCode) {
    this.companyCode = companyCode;
    this.companyInfo = CompanyInfo[companyCode];
    this.menuInfo = MenuInfo[companyCode];
    this.configInfo = ConfigInfo[companyCode];
  }

  @action
  getCompanyInfoByKey(key) {
    return _.get(this.companyInfo, key);
  }

  @action
  reloadPageByCompanyCode(companyCode) {
    window.location.href = '/#/?companyCode=' + companyCode;
    window.location.reload();
  }
}

export default CompanyStore;
