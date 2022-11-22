export interface IBaseResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}

export interface IRecordTotal<T = any> {
  records: T[];
  total: number;
}