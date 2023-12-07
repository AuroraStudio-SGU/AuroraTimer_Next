import {defineStore} from 'pinia'
import {DefaultSetting, SettingFile} from "../utils/Setting";
import {getDuty, getTargetTime} from "../api/API";
import {isSameWeek} from "../utils/DateUtils";
import {DutyList, UserInfo, UserTime} from "../api/interfaces/Schema";


const themes = [
    "Earth",
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
]; //主题列表

type MouseState = 'running' | 'paused'

export const GlobalStore = defineStore('main', {
    state: () => ({
        loginPanel: false,
        UserRankList: [] as UserTime[],//排行榜缓存
        ProjectLink: 'https://github.com/AuroraStudio-SGU/AuroraTimer_Next',
        Setting: DefaultSetting as SettingFile,
        ThemeList: themes,
        lastMousePoint: null as Electron.Point,
        AFKDetected: true,
        isAFK: false,
        DutyList: [] as DutyList[],
        TargetTime: -1,
        AvatarUpdateFlag:Math.random(),
        MouseSate: "running" as MouseState,
    }),
    getters: {
        getUserInfo(state): UserInfo {
            return state.Setting.userInfo
        },
        getUserToken(state): string {
            return state.Setting.userInfo.token
        },
        getCurrentTheme(state): string {
            return state.Setting.skin
        },
        getTimerProgress(state) {
            let percentage = Number((state.Setting.userInfo.currentWeekTime / 864).toFixed(2))
            return {
                big: percentage > 100 ? 100 : percentage,
                middle: percentage - 100 < 0 ? 0 : percentage - 100 > 100 ? 100 : percentage - 100,
                little: percentage - 200 < 0 ? 0 : percentage - 200 > 100 ? 100 : percentage - 200,
            }
        },
    },
    actions: {
        changeLoginPanel(): void {
            this.loginPanel = true
        },
        loadAllSetting(setting: SettingFile) {
            this.Setting = setting
        },
        changeTheme(theme: string) {
            this.Setting.skin = theme
        },
        setUserInfo(user: UserInfo) {
            this.Setting.userInfo = user
        },
        setUserRankList(list:UserTime[]) {
          this.UserRankList = list;
        },
        async getDutyList(): Promise<DutyList> {
            if (this.DutyList.wed == undefined || isSameWeek(this.DutyList.createTime, new Date())) {
                let result = await getDuty()
                if (result.success) {
                    this.DutyList.wed = result.data.wednesday
                    this.DutyList.sun = result.data.sunday
                    this.DutyList.createTime = new Date(result.data.createTime)
                    return this.DutyList;
                }
            } else {
                return this.DutyList
            }
        },
        async getTargetTime() {
            if (this.TargetTime === -1) {
                let res = await getTargetTime()
                if (res.success) {
                    if (res.data != null) {
                        this.TargetTime = res.data;
                    }
                }
            }
            return this.TargetTime;
        },
        getUidFormName(name: string): string | null {
            let list:UserTime[] = this.UserRankList
            let resList = list.filter((t)=>t.name===name);
            if(resList.length>1){
                return "ERROR_MULTI_USER_RESULT"
            }else if(resList.length==0) return null;
            return resList[0].id
        },
        changeMouseState(flag?:boolean){
            if(flag === undefined || flag == null){
                if(this.MouseSate==="running"){
                    this.MouseSate = "paused"
                }else {
                    this.MouseSate = "running"
                }
                return;
            }
            if(flag){
                this.MouseSate="running"
            }else {
                this.MouseSate = "paused"
            }
        }
    }
})

