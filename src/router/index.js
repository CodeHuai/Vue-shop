import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import routes from "./routes";
import store from "@/store";

//先把原来的push方法保存起来
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolved, rejected) {
  if (resolved === undefined && rejected === undefined) {
    return originPush.call(this, location).catch(() => {});
  } else {
    return originPush.call(this, location, resolved, rejected);
  }
};

VueRouter.prototype.replace = function (location, resolved, rejected) {
  if (resolved === undefined && rejected === undefined) {
    return originReplace.call(this, location).catch(() => {});
  } else {
    return originReplace.call(this, location, resolved, rejected);
  }
};

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

// 全局前置守卫
// 全局前置路由导航守卫（token校验、根据token获取用户信息、权限控制）
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let userInfo = store.state.user.userInfo;
  // 如果有token
  if (token) {
    // 去的还是首页
    if (to.path === "/login") {
      next("/");
    } else {
      // 如果去的不是首页
      if (userInfo.name) {
        // 此时既有token 又有用户的信息,所以可以任意去想去的
        next();
      } else {
        // 有token 但是没有用户的信息,所以需要发送请求
        try {
          //获取用户信息成功
          // 注意这里的token, 是放置在请求拦截器中,千万不要忘记了
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // next("/login");
          //代表获取用户信息失败,一概归结为token过期
          // 先清空token
          // state.xxx = 'xxx' 这样的写法不能在这里写，vuex的数据必须通过mutation直接修改
          await store.dispatch("removeToken");
          next("/login");
        }
      }
    }
  } else {
    // 没有token
    // 目前先放行
    // next();
    //代表token不存在，用户没登录过
    // next() //目前我们先无条件放行，后面我们做了支付等功能完成后再回来限定它
    let targetPath = to.path;
    if (
      targetPath.indexOf("/trade") === 0 ||
      targetPath.startsWith("/center") ||
      targetPath.startsWith("/pay")
    ) {
      next("/login?redirect=" + targetPath);
    } else {
      next();
    }
  }
});

export default router;
