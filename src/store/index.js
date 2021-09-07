import Vue from "vue";
import Vuex from "vuex";
import home from "./modules/home";
import user from "./modules/user";

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
  },
});
