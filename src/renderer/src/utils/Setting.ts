import {UserInfo} from "../api/interfaces/Schema";

export interface SettingFile{
  userInfo:UserInfo,
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
    id: '-1',
    name: '如果你看到这个,说明配置文件炸了,请联系管理员',
    WeekTime: 0,
    admin: false,
    token: 'why u thing there will have default token?',
    major: 'major',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    grade:'21级',
    work_group:'Web组',
    afk:false,
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
    host:"http://192.168.49.66:8088",
  },
  version:"0.0.1",
  skin:"light",
  autoLogin:true,
  OpenAtStart:false,
}
