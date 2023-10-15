export interface SettingFile{
  userInfo:{
    id: string,
    name: string,
    avatar:string,
    WeekTime: number,
    isAdmin: boolean,
    token:string,
    major:string,
    grade:string,
    work_group:string,
  },
  progressBar:{
    color:{
      small:{
        start:string,
        end:string,
      },
      medium:{
        start:string,
        end:string,
      },
      big:{
        start:string,
        end:string,
      }
    }
  },
  netWork:{
    host:string,
  },
  version:string,
  skin:string,
  autoLogin:boolean,
  OpenAtStart:boolean,
}
export const DefaultSetting:SettingFile={
  userInfo:{
    id: '21125023044',
    name: 'DAY',
    WeekTime: 0,
    isAdmin: true,
    token: 'why u thing there will have default token?',
    major: 'major',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    grade:'21级',
    work_group:'Web组'
  },
  progressBar:{
    color:{
      small:{
        start:'#fff1eb',
        end:'#ace0f9',
      },
      medium:{
        start:'#a8edea',
        end:'#fed6e3',
      },
      big:{
        start:'#a6c0fe',
        end:'#f68084',
      }
    }
  },
  netWork:{
    host:"http://localhost:8084",
  },
  version:"0.0.1",
  skin:"light",
  autoLogin:false,
  OpenAtStart:false,
}
