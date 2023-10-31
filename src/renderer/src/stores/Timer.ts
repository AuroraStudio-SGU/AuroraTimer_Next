import {defineStore} from 'pinia'
import {SecondToString} from "../utils/TimeUtil";
import {GlobalStore} from "./Global";



//基本上没什么用的store了()
export const TimerStore = defineStore('timer', {
    // other options...
    state: () => ({
        time: 0,
        isStarted: false,
        timer: {} as Worker,
        AfkLimit: 1440,//挂机时间检测阈值,单位为秒,且实际阈值为这里的两倍!
        AFKNotification: null as Notification
    }),
    getters: {
        getTimeStr(state) {
            return SecondToString(state.time)
        },
        getTime(state) {
            const globalStore = GlobalStore()
            return globalStore.Setting.userInfo.WeekTime
        },
    },
    actions: {
        TimePlusPlus() {
            const globalStore = GlobalStore()
            this.time += 1;
            globalStore.Setting.userInfo.WeekTime += 1;
        },
        clearTime() {
            this.time = 0;
        },
        OpenTimer() {
            this.isStarted = true
        },
        CloseTimer() {
            this.isStarted = false
        },
    }
})
