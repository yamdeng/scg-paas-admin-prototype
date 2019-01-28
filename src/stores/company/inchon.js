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

let menuInfo = [
  { title: '디바이스', linkUrl: '/device-basic', except: true },
  { title: '하단영역 선택', linkUrl: '/footer-select', except: true },
  { title: '라디오 스위치', linkUrl: '/checkbox-switch', except: true },
  { title: '탭 스크롤', linkUrl: '/tab-scroll', except: true },
  { title: '아코디언 부트스트랩', linkUrl: '/accordion-b', except: true },
  {
    title: 'company-inchon-test',
    linkUrl: '/company-inchon-test',
    success: true
  }
];

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
  'linkUrl'
).filter(info => {
  return !info.except;
});

export const inchonConfigInfo = _.defaultsDeep({}, configInfo, basicConfigInfo);
