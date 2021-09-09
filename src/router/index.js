import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import routes from "./routes";

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
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
