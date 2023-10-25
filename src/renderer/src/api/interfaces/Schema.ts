export interface APIResponse<T> {
  success:boolean;
  msg:string;
  data:T;
}
export interface User { //only for login
  id:string;
  name:string;
  password:string;
  avatar:string;
  admin:boolean;
  afk:boolean;
  reduceTime:number;
  unfinishedCount:number;
  major:string;
  grade:string;
  workGroup:string;
}
export interface UserTime {
  id:string,
  name:string,
  totalTime:number,
  weekTime:number,
  reduceTime:number,
  unfinishedCount:number,
  avatar:string,//前端字段
}
export interface UserInfo {
  id: string,
  name: string,
  WeekTime: number,
  admin: boolean,
  token:string,
  major:string,
  grade:string,
  work_group:string,
  avatar:string,
  afk:boolean,
}
export interface DutyList {
  wed: string,
  sun: string,
  createTime: Date
}
export interface Notice{
  user_id:string,
  notice_id:string | null,
  notice:string,
  updateTime:Date
}
export interface UserTime_avtar {
  id:string,
  name:string,
  totalTime:number,
  weekTime:number,
  reduceTime:number,
  unfinishedCount:number,
  avatar:string,
}
