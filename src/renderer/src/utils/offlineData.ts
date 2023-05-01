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
    TotalTime: 576000,
    WeekTime: 64800,
    isAdmin:false,
    job:'normal'
  },
  {
    name: '陈典灿',
    TotalTime: 676000,
    WeekTime: 94200,
    isAdmin:false,
    job:'normal',
  },
  {
    name: '梓聪',
    TotalTime: 720000,
    WeekTime: 140000,
    isAdmin:false,
    job:'normal',
  },
]
