import { inchonConfigInfo } from './inchon';
import { seoulConfigInfo } from './seoul';
import Constant from '../../config/Constant';

let ConfigInfo = {};
ConfigInfo[Constant.COMPANY_CODE_SEOUL] = seoulConfigInfo;
ConfigInfo[Constant.COMPANY_CODE_INCHON] = inchonConfigInfo;

export default ConfigInfo;
