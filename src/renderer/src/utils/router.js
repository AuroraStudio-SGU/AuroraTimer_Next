// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
import Main from "../Page/Main.vue";
import About from "../Page/About.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import TimerProgress from "../Page/TimerProgress.vue";
import Rank from "../Page/Rank.vue";
import Other from "../Page/Other.vue";

const routes = [
  {path: '/', name: 'Timer', component: TimerProgress},
  {path: '/about', name: 'About', component: About, props: true},
  {path: '/main', name: 'Main', component: Main},
  {path: '/rank', name: 'Rank', component: Rank},
  {path: '/other', name: 'Other', component: Other},
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
  // 每次路由切换时，将全局 meta 标签添加到文档的 head 中
  if (to.meta.contentSecurityPolicy) {
    const head = document.getElementsByTagName('head')[0];
    const meta = document.createElement('meta');
    meta.setAttribute('http-equiv', to.meta.contentSecurityPolicy.httpEquiv);
    meta.setAttribute('content', to.meta.contentSecurityPolicy.content);
    head.appendChild(meta);
  }
  next();
});
