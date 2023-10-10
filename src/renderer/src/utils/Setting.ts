export interface SettingFile{
  userInfo:{
    uid: string,
    name: string,
    WeekTime: number,
    isAdmin: boolean,
    Token:string,
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
    uid: '21125023044',
    name: 'DAY',
    WeekTime: 960000,
    isAdmin: true,
    Token: 'why u thing there will have default token?'
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
