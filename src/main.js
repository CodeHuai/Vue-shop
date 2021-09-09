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

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
