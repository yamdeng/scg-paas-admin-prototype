let companyInfo = {
  label1: 'basic',
  label2: 'basic2',
  info1: {
    label1: 'info1-basic1',
    label2: 'info1-basic2'
  },
  info2: {
    label1: 'info2-basic1',
    label2: 'info2-basic2',
    'info2-1': {
      label1: 'info2(1)-basic1',
      label2: 'info2(1)-basic2'
    }
  }
};

let menuInfo = [
  { title: '홈', linkUrl: '/home', success: true },
  { title: '아코디언 부트스트랩', linkUrl: '/accordion-b', success: true },
  {
    title: '아코디언 메트리얼',
    linkUrl: '/accordion-m?aa=aa&bb=bb',
    success: true
  },
  { title: '탭 부트스트랩', linkUrl: '/tab-b', success: true },
  { title: '탭 메트리얼', linkUrl: '/tab-m', success: true },
  { title: '디바이스', linkUrl: '/device-basic', success: true },
  { title: '하단영역 선택', linkUrl: '/footer-select', success: true },
  { title: '라디오 스위치', linkUrl: '/checkbox-switch', success: true },
  { title: '탭 스크롤', linkUrl: '/tab-scroll', success: true },
  { title: '네이티브 인터페이스', linkUrl: '/native-interface', success: true },
  { title: '모달 테스트1', linkUrl: '/modal-test-1' },
  { title: 'sass', linkUrl: '/sass', success: true },
  { title: '환경변수', linkUrl: '/environment', success: true },
  { title: '에러테스트', linkUrl: '/error-test', success: true },
  { title: '클라이언트 에러', linkUrl: '/error-client', success: true },
  { title: '서버 에러', linkUrl: '/error-server', success: true },
  { title: '권한 에러', linkUrl: '/error-auth', success: true },
  { title: '상담톡 목록', linkUrl: '/talk-list', success: true },
  { title: '상담톡 애니메이션', linkUrl: '/talk-anmation' },
  { title: '푸쉬 테스트1', linkUrl: '/pushcase-1' },
  { title: 'Analytics', linkUrl: '/analytics' },
  { title: '폼 테스트', linkUrl: '/form-test' },
  { title: '차트 테스트1', linkUrl: '/chartcase-1' },
  {
    title: '테이블 페이징 스크롤',
    linkUrl: '/table-page-scroll',
    success: true
  },
  {
    title: '이미지 페이징 스크롤',
    linkUrl: '/image-page-scroll',
    success: true
  },
  { title: '리액트 에러 테스트', linkUrl: '/react-error-test', success: true },
  { title: '퍼블리싱 테스트', linkUrl: '/publish-test', success: true },
  {
    title: '불변 자료구조 테스트',
    linkUrl: '/immutability-test',
    success: true
  },
  {
    title: '불변 자료구조 테스트2',
    linkUrl: '/immutability-test2',
    success: true
  },
  {
    title: '저장소 테스트',
    linkUrl: '/store-test',
    success: true
  },
  {
    title: '저장소 테스트2',
    linkUrl: '/store-test2',
    success: true
  },
  {
    title: '도메인 테스트(list)',
    linkUrl: '/domain-list',
    success: true
  },
  {
    title: '도메인 테스트(detail)',
    linkUrl: '/domain-detail?id=1',
    success: true
  },
  {
    title: 'Api 테스트(list)',
    linkUrl: '/api-list',
    success: true
  },
  {
    title: 'Api 테스트(detail)',
    linkUrl: '/api-detail?id=1',
    success: true
  },
  {
    title: 'company-code-test',
    linkUrl: '/company-code-test',
    success: true
  }
];

let configInfo = {
  contractInputFirstSize: 2,
  contractInputSecondSize: 3,
  contractInputThirdSize: 4
};

export const basicCompanyInfo = companyInfo;

export const basicMenuInfo = menuInfo;

export const basicConfigInfo = configInfo;
