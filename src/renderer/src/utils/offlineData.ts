export interface User {
  name:string,
  uid:string,
  TotalTime:number,
  WeekTime:number,
  isAdmin:boolean,
  job:string
}

export const UserList:User[] = [
  {
    name: '欧润丰',
    uid:'2112999999',
    TotalTime: 576000,
    WeekTime: 64800,
    isAdmin:false,
    job:'normal'
  },
  {
    name: '陈典灿',
    uid:'1912999999',
    TotalTime: 676000,
    WeekTime: 94200,
    isAdmin:false,
    job:'normal',
  },
  {
    name: '梓聪',
    uid:'20122999999',
    TotalTime: 720000,
    WeekTime: 140000,
    isAdmin:false,
    job:'normal',
  },
  {
    name: '欧润丰',
    uid:'2112999999',
    TotalTime: 576000,
    WeekTime: 64800,
    isAdmin:false,
    job:'normal'
  },
  {
    name: '陈典灿',
    uid:'19122999999',
    TotalTime: 676000,
    WeekTime: 94200,
    isAdmin:false,
    job:'normal',
  },
  {
    name: '梓聪',
    uid:'2012999999',
    TotalTime: 720000,
    WeekTime: 140000,
    isAdmin:false,
    job:'normal',
  },
]
