import { inchonCompanyInfo } from './inchon';
import { seoulCompanyInfo } from './seoul';
import Constant from '../../config/Constant';

let CompanyInfo = {};
CompanyInfo[Constant.COMPANY_CODE_SEOUL] = seoulCompanyInfo;
CompanyInfo[Constant.COMPANY_CODE_INCHON] = inchonCompanyInfo;

export default CompanyInfo;
