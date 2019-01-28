import { inchonMenuInfo } from './inchon';
import { seoulMenuInfo } from './seoul';
import Constant from '../../config/Constant';

let MenuInfo = {};
MenuInfo[Constant.COMPANY_CODE_SEOUL] = seoulMenuInfo;
MenuInfo[Constant.COMPANY_CODE_INCHON] = inchonMenuInfo;

export default MenuInfo;
