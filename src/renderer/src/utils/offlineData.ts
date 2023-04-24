interface User {
  name:string,
  TotalTime:number,
  WeekTime:number,
  isAdmin:boolean,
  job:string
}

export const UserList:User[] = [
  {
    name: '欧润丰',
    TotalTime: 4800000,
    WeekTime: 960000,
    isAdmin:false,
    job:'normal'
  },
  {
    name: '陈典灿',
    TotalTime: 6000000,
    WeekTime: 1080000,
    isAdmin:false,
    job:'normal',
  },
  {
    name: '梓聪',
    TotalTime: 7200000,
    WeekTime: 1440000,
    isAdmin:false,
    job:'normal',
  },
]
