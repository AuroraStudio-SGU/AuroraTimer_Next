export interface APIResponse<T> {
  success:boolean;
  msg:string;
  data:T;
}
export interface User { //most time should not use it
  id: string,
  name: string,
  password:string,
  admin: boolean,
  token: string,
  major: string,
  grade: string,
  workGroup: string,
  avatar: string,
  afk: boolean,
  reduceTime:number,
  priv:number,
}
export interface UserTime {
  id:string,
  name:string,
  totalTime:number,
  weekTime:number,
  reduceTime:number,
  unfinishedCount:number,
  grade:string,
  avatar:string,
  workGroup:string,
  priv:number,
}
export interface UserInfo {
  id: string,
  name: string,
  currentWeekTime: number,
  admin: boolean,
  token:string,
  major:string,
  grade:string,
  workGroup:string,
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
export interface Priv{
  val:number,
  candidName:string
}
export const WorkGroupList = ["Web前端","Web后端","算法","设计","嵌入式","人工智能","数据分析","网络安全"];
export const PrivList = [
  {val:0,name:"考核成员"},
  {val:1,name:"普通成员"},
  {val:2,name:"值日委员"},
  {val:11,name:"算法端组长"},
  {val:12,name:"设计组长"},
  {val:13,name:"嵌入式组长"},
  {val:14,name:"数据分析组长"},
  {val:15,name:"人工智能组长"},
  {val:16,name:"网安组长"},
  {val:17,name:"Web端组长"},
  {val:100,name:"管理员"},
]

export const getPriv = (priv:number)=>{
  switch (priv) {
    case 0:return "考核成员"
    case 1:return "普通成员"
    case 2:return "值日委员"
    case 11:return "算法端组长"
    case 12:return "设计组长"
    case 13:return "嵌入式组长"
    case 14:return "数据分析组长"
    case 15:return "人工智能组长"
    case 16:return "网安组长"
    case 17:return "Web端组长"
    case 100:return "管理员"
    default:
      return "无效权限";
  }
}
export const EmptyUserInfo:UserInfo = {
  admin: false,
  afk: false,
  avatar: "",
  currentWeekTime: 0,
  grade: "",
  id: "",
  major: "",
  name: "",
  token: "",
  workGroup: ""
}

export interface Term {
  id:string
  start:Date,
  end:Date
}

