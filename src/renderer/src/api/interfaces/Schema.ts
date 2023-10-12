export interface APIResponse {
  success:boolean;
  msg:string;
  data:any;
}

export interface getRank {
  code:number,
  msg:string,
  data:UserTime[]
}


export class User {
  id:string;
  name:string;
  password:string;
}

export interface UserTime {
  id:string,
  name:string,
  totalTime:number,
  weekTime:number,
  reduceTime:number,
  unfinishedCount:number,
}
/*
  id:string,
  name:string,
  major:string,
  token:string,
 */
export interface UserInfo {
  id: string,
  name: string,
  WeekTime: number,
  isAdmin: boolean,
  Token:string,
  major:string,
}
export interface DutyList {
  wed: string,
  sun: string,
  createTime: Date
}
