import _ from 'lodash';
import { basicCompanyInfo, basicMenuInfo, basicConfigInfo } from './basic';

let companyInfo = {
  label1: 'seoul',
  label2: 'seoul2',
  info1: {
    label1: 'info1-seoul1',
    label2: 'info1-seoul2'
  },
  info2: {
    label1: 'info2-seoul1',
    label2: 'info2-seoul2',
    'info2-1': {
      label1: 'info2(1)-seoul1',
      label2: 'info2(1)-seoul2'
    }
  },
  seoulLabel1: 'seoulOnly',
  seoulInfo: {
    label1: 'seoulInfo-label1',
    label2: 'seoulInfo-label2'
  }
};

let menuInfo = [{ title: '서울전용 메뉴', linkUrl: '/seoul/test' }];

let configInfo = {
  contractInputFirstSize: 2,
  contractInputSecondSize: 3,
  contractInputThirdSize: 7
};

export const seoulCompanyInfo = _.defaultsDeep(
  {},
  companyInfo,
  basicCompanyInfo
);

export const seoulMenuInfo = _.unionBy(menuInfo, basicMenuInfo, 'title').filter(
  info => {
    return !info.except;
  }
);

export const seoulConfigInfo = _.defaultsDeep({}, configInfo, basicConfigInfo);
