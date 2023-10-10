import {defineStore} from 'pinia'
import {ref} from "vue";
import {SecondToString} from "../utils/TimeUtil";
import {GlobalStore} from "./Global";


// 第一个参数是应用程序中 store 的唯一 id
export const TimerStore = defineStore('timer', {
    // other options...
    state: () => ({
        percent: ref(0),
        size: ref(0),
        time: ref(0),
        isStarted: ref(false),
        timer: {} as Worker,
        AfkLimit: ref(1800),//挂机时间检测阈值,单位为秒,且实际阈值为这里的两倍!
        UserRankList: ref<UserTime[]>(),
    }),
    getters: {
        getPercent(state) {
            return state.percent
        },
        getTimeStr(state) {
            return SecondToString(state.time)
        },
        getTimerProgress(state) {
            let percentage = Number((state.time / 864).toFixed(2))
            return {
                big: percentage > 100 ? 100 : percentage,
                middle: percentage - 100 < 0 ? 0 : percentage - 100 > 100 ? 100 : percentage - 100,
                little: percentage - 200 < 0 ? 0 : percentage - 200 > 100 ? 100 : percentage - 200,
            }
        }
    },
    actions: {
        TimePlusPlus() {
            this.time += 1;
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
