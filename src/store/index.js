import Vue from "vue";
import Vuex from "vuex";
import home from "./modules/home";
import user from "./modules/user";
import search from "./modules/search";
import detail from "./modules/detail";
import shopcart from "./modules/shopcart";

Vue.use(Vuex);
const state = {};
const mutations = {};
const actions = {};
const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    home,
    user,
    search,
    detail,
    shopcart,
  },
});
