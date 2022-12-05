import instance from '@/utils/request';
import { IBaseResponse, IRecordTotal } from '@/types';

export interface IUserInfo {
  id: string;
  card: string;
  name: string;
  sex: 0 | 1;
  job: string;
  grade: string;
  remark: string;
}

/**
 * 获取人员信息
 * @returns
 */
export const getUserList = () => {
  return instance.request<any, IBaseResponse<IRecordTotal<IUserInfo>>>({
    url: '/tr/user',
    method: 'get'
  });
};

export interface IUserAdd {
  cardId: string;
  name: string;
  sex: 0 | 1;
  job: string;
  department: string;
}

/**
 * @description 获取登录图片验证码
 * @returns
 */
export const getLoginCode = () => {
  return instance.request<any, Blob>({
    url: '/ued/code/loginCode',
    method: 'get',
    responseType: 'blob'
  });
};
