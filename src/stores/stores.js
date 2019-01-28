import RootStore from './RootStore';

let rootStore = new RootStore();

/*

    rootStore : store 간의 통신을 도와주는 최상위 store
    appStore : 앱 전반적인 관리를 하는 store

*/

/*

    store 추가 방법
     1.store 파일을 만든다
     2.RootStore.js 파일에 새로 생성한 store를 주입시킨다
     3.stores.js store 변수의 key값으로 새로 생성한 store를 추가한다
     4.FrontIssueStore.js : 프론트 테스트 store
     5.UiStore.js : UI store
     6.TestStore.js : Test store
     7.CompanyStore.js : Company Store

*/

let stores = {
  rootStore: rootStore,
  appStore: rootStore.appStore,
  nativeStore: rootStore.nativeStore,
  frontIssueStore: rootStore.frontIssueStore,
  uiStore: rootStore.uiStore,
  testStore: rootStore.testStore,
  companyStore: rootStore.companyStore
};

export default stores;
