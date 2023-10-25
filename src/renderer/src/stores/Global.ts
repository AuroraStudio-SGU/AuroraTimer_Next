import {defineStore} from 'pinia'
import {DefaultSetting, SettingFile} from "../utils/Setting";
import {getDuty, getRank, getTargetTime} from "../api/API";
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

export const GlobalStore = defineStore('main', {
    state: () => ({
        loginPanel: false,
        UserRankList: [] as UserTime[],//排行榜缓存
        ProjectLink: 'https://github.com/AuroraStudio-SGU/AuroraTimer_Next',
        Setting: DefaultSetting as SettingFile,
        ThemeList: themes,
        lastMousePoint: false,
        AFKDetected: true,
        isAFK: false,
        DutyList: [] as DutyList[],
        TargetTime: -1,
        AvatarUpdateFlag:Math.random(),
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
        }
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
        async getUserRankList(isRefresh: boolean, index?: number) {
            if (this.UserRankList.length == 0 || isRefresh) {
                //获取新Rank
                if (index == undefined) index = 0;
                let Response = await getRank(index);
                if (Response.success) {
                    this.UserRankList.value = Response.data
                    return Response.data;
                } else {
                    return null
                }
            } else {
                return this.UserRankList
            }
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
        }
    }
})

