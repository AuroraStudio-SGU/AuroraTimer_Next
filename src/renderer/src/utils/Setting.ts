export interface SettingFile{
  userInfo:{
    id: string,
    name: string,
    WeekTime: number,
    isAdmin: boolean,
    Token:string,
    major:string,
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
    Token: 'why u thing there will have default token?',
    major: 'major',
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
  skin:"valentine",
  autoLogin:false,
  OpenAtStart:false,
}
