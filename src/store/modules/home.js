//发请求其实最终就是书写vuex三连环
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";

const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  RECEIVE_CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  RECEIVE_BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  RECEIVE_FLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  //发请求拿数据提交给mutation
  async getCategoryList({ commit }) {
    const result = await reqCategoryList();
    if (result.code === 200) {
      commit("RECEIVE_CATEGORYLIST", result.data);
    }
  },
  // 请求首页轮播数据
  async getBannerList({ commit }) {
    const result = await reqBannerList();
    if (result.code === 200) {
      commit("RECEIVE_BANNERLIST", result.data);
    }
  },
  // 请求楼层数据
  async getFloorList({ commit }) {
    const result = await reqFloorList();
    if (result.code === 200) {
      commit("RECEIVE_FLOORLIST", result.data);
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
