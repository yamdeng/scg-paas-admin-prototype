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
  { title: '홈', linkUrl: '/home' },
  {
    title: '테이블',
    linkUrl: '',
    childId: 'table',
    child: [
      { title: '테스트', linkUrl: '/table/test' },
      { title: '페이징', linkUrl: '/table/paging' },
      { title: '검색/정렬', linkUrl: '/table/filter' }
    ]
  },
  {
    title: '폼',
    linkUrl: '',
    childId: 'form',
    child: [
      { title: '상세/popup', linkUrl: '/form/detail' },
      { title: '등록/수정', linkUrl: '/form/create' }
    ]
  },
  {
    title: '파일업로드',
    linkUrl: '/fileupload'
  },
  {
    title: 'color 컴포넌트',
    linkUrl: '',
    childId: 'color',
    child: [{ title: '테스트', linkUrl: '/color/test' }]
  },
  {
    title: 'select 컴포넌트',
    linkUrl: '',
    childId: 'select',
    child: [{ title: '테스트', linkUrl: '/select/test' }]
  },
  {
    title: '에디터',
    linkUrl: '',
    childId: 'editor',
    child: [
      { title: 'ckeditor', linkUrl: '/editor/ckeditor' },
      { title: 'ckeditor', linkUrl: '/editor/summernote' }
    ]
  },
  {
    title: '로그인',
    linkUrl: '/login'
  },
  {
    title: '회원가입',
    linkUrl: '/signup'
  },
  {
    title: '드래그앤드랍',
    linkUrl: '',
    childId: 'dragdrop',
    child: [
      { title: '테스트', linkUrl: '/dragdrop/test' },
      { title: '서버', linkUrl: '/dragdrop/server' }
    ]
  },
  {
    title: '달력컴포넌트',
    linkUrl: '',
    childId: 'calendar',
    child: [
      { title: 'rc-calendar', linkUrl: '/calendar/rc' },
      { title: 'rc-calendar-final', linkUrl: '/calendar/final' }
    ]
  },
  {
    title: '로컬 네비게이션',
    linkUrl: '/네비게이션'
  },
  {
    title: '로딩바, noti, alert, confirm',
    linkUrl: '/alert'
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
