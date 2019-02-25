import _ from 'lodash';
import { basicCompanyInfo, basicMenuInfo, basicConfigInfo } from './basic';

let companyInfo = {
  info1: {
    label1: 'info1-inchon1'
  },
  info2: {
    label2: 'info2-inchon2',
    'info2-1': {
      label1: 'info2(1)-inchon1'
    }
  },
  inchonLabel1: 'inchonOnly',
  inchonInfo: {
    label1: 'inchonInfo-label1',
    label2: 'inchonInfo-label2'
  }
};

let menuInfo = [{ title: '인천전용 메뉴', linkUrl: '/inchon/test' }];

let configInfo = {
  contractInputFirstSize: 5,
  contractInputSecondSize: 5,
  contractInputThirdSize: 5
};

export const inchonCompanyInfo = _.defaultsDeep(
  {},
  companyInfo,
  basicCompanyInfo
);

export const inchonMenuInfo = _.unionBy(
  menuInfo,
  basicMenuInfo,
  'title'
).filter(info => {
  return !info.except;
});

export const inchonConfigInfo = _.defaultsDeep({}, configInfo, basicConfigInfo);
