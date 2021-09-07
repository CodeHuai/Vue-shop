import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

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

export default new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/search/:keyword?",
      component: Search,
      name: "search", //命名路由
    },
    {
      path: "/login",
      component: Login,
      meta: {
        isHidden: true,
      },
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isHidden: true,
      },
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});
