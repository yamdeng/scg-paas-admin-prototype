import stores from '../stores/stores';

function show() {
  stores.uiStore.showLoadingBar();
}

function hide() {
  stores.uiStore.hideLoadingBar();
}

const LoadingBar = {
  show: show,
  hide: hide
};

export default LoadingBar;
