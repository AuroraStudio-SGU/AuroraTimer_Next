export interface SettingFile{
  userInfo:{
    uid: string,
    name: string,
    WeekTime: number,
    isAdmin: boolean
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
  }
}
export const DefaultSetting:SettingFile={
  userInfo:{
    uid: '21125023044',
    name: 'DAY',
    WeekTime: 960000,
    isAdmin: true
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
    host:"http://43.138.237.251:8001",
  }
}
