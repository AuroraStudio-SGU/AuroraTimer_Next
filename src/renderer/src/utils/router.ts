// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
import Main from "../Page/Main.vue";
import About from "../Page/Setting.vue";
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import TimerProgress from "../Page/TimerProgress.vue";
import Rank from "../Page/Rank.vue";
import Other from "../Page/Other.vue";
import Login from "../Page/Login.vue";
import Welcome from "../Page/Welcome.vue";
import IconTest from "../Page/IconTest.vue";
import Calculator from "../Page/Calculator.vue";
import NewUI from "../Page/NewUI.vue";
import ThemeTest from "../Page/ThemeTest.vue";

const routes = [
  {path: '/', name: 'Timer', component: TimerProgress},
  {path: '/setting', name: 'Setting', component: About, props: true},
  {path: '/main', name: 'Main', component: Main},
  {path: '/rank', name: 'Rank', component: Rank},
  {path: '/other', name: 'Other', component: Other},
  {path: '/Login', name: 'Login', component: Login},
  {path: '/welcome', name: 'Welcome', component: Welcome},
  {path: '/icontest', name: 'IconTest', component: IconTest},
  {path: '/calculator', name: 'Calculator', component: Calculator},
  {path: '/newUI', name: 'NewUI', component: NewUI},
  {path: '/themetest', name: 'ThemeTest', component: ThemeTest},

]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
