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
  }
}
export let Setting:SettingFile ={
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
  }
}
