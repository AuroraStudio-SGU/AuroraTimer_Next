import {defineStore} from 'pinia'
import {SecondToString} from "../utils/TimeUtil";
import {GlobalStore} from "./Global";
import {UserTime} from "../api/interfaces/Schema";


// 第一个参数是应用程序中 store 的唯一 id
export const TimerStore = defineStore('timer', {
    // other options...
    state: () => ({
        percent: 0,
        size: 0,
        time: 0,
        isStarted: false,
        timer: {} as Worker,
        AfkLimit: 1800,//挂机时间检测阈值,单位为秒,且实际阈值为这里的两倍!
        UserRankList: [] as UserTime[],
    }),
    getters: {
        getPercent(state) {
            return state.percent
        },
        getTimeStr(state) {
            return SecondToString(state.time)
        },
        getTimerProgress(state) {
            const globalStore = GlobalStore()
            let percentage = Number((globalStore.Setting.userInfo.WeekTime / 864).toFixed(2))
            return {
                big: percentage > 100 ? 100 : percentage,
                middle: percentage - 100 < 0 ? 0 : percentage - 100 > 100 ? 100 : percentage - 100,
                little: percentage - 200 < 0 ? 0 : percentage - 200 > 100 ? 100 : percentage - 200,
            }
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
        setTimeFromServer(time: number) {
            const globalStore = GlobalStore()
            globalStore.Setting.userInfo.WeekTime = time;
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
        ChangeTime(time: number) {
            this.time = time;
        },
        setUserTimeList(list: UserTime[]) {
            this.UserRankList = list
        },
        async getUidFormName(name: string): Promise<string> {
            let list = this.UserRankList;
            if (list === undefined) {
                const globalStore = GlobalStore()
                let res = await globalStore.getUserRankList(true, 1)
                if (res) {
                    list = res;
                    this.UserRankList = res;
                }
            }
            let res = null;
            list.forEach((u, index) => {
                if (u.name === name) {
                    res = u.id;
                }
            })
            return res;
        }
    }
})
