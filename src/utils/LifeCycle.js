import { lifecycle } from 'recompose';
import Constant from '../config/Constant';
import Logger from '../utils/Logger';

function applyComponentDidMount(Component) {
  if (process.env.APP_ENV === Constant.APP_ENV_DEVELOPMENT) {
    return lifecycle({
      componentDidMount() {
        Logger.info('componentDidMount : ' + this.constructor.name);
      }
    })(Component);
  } else {
    return Component;
  }
}

export const componentDidMount = applyComponentDidMount;
