import Notice from "../Page/Notice.vue";
import About from "../Page/Setting.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import TimerProgress from "../Page/TimerProgress.vue";
import Rank from "../Page/Rank.vue";
import Other from "../Page/Other.vue";
import Login from "../Page/Login.vue";
import Welcome from "../Page/Welcome.vue";
import LeaderBoard from "../Page/LeaderBoard.vue";
import ThemeChange from "../Page/ThemeChange.vue";
import Admin from "../Page/Admin.vue";
import Information from "../Page/Information.vue";
import UserManage from "../Page/UserManage.vue";

const routes = [
  {path: '/', name: 'Timer', component: TimerProgress},
  {path: '/setting', name: 'Setting', component: About, props: true},
  {path: '/Notice', name: 'Notice', component: Notice},
  {path: '/rank', name: 'Rank', component: Rank},
  {path: '/other', name: 'Other', component: Other},
  {path: '/Login', name: 'Login', component: Login},
  {path: '/welcome', name: 'Welcome', component: Welcome},
  {path: '/leaderboard', name: 'LeaderBoard', component: LeaderBoard},
  {path: '/themes', name: 'Themes', component: ThemeChange},
  {path: '/admin', name: 'Admin', component: Admin},
  {path: '/user/info', name: 'Info', component: Information},
  {path: '/admin/users', name: 'Users', component: UserManage},
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
