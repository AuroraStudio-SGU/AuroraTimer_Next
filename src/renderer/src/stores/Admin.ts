import {defineStore} from 'pinia'
import {getNotice} from "../api/API";
import {Notice} from "../api/interfaces/Schema";


export const AdminStore = defineStore('admin', {
    // other options...
    state: () => ({
        notice: null as Notice,
    }),
    getters: {},
    actions: {
        async getNotice(): Promise<Notice> {
            let res = await getNotice()
            if (res.success) {
                this.notice = res.data;
            }
            return this.notice
        }
    }
})
