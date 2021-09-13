import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

import "@/mock/mockServer";
import "swiper/css/swiper.min.css";
import Pagination from "@/components/Pagination";
Vue.component("Pagination", Pagination);
import TypeNav from "@/components/TypeNav";
Vue.component("TypeNav", TypeNav);
// 这种写法是不借助vuex进行接口的请求, 需要注意的是 这种暴露的方式类似于全局事件总线  需要挂载到 Vue的原型对象上面
import * as API from "@/api";

// element-ui的按需引入
import { Button, MessageBox, Message } from "element-ui";
// Vue.use(Button)
Vue.component(Button.name, Button);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Vue.prototype.$API = API;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
