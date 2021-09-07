import { reqCategoryList } from "@/api";

const state = {
  categoryList: [],
};
const mutations = {
  RECEIVE_CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
};
const actions = {
  // 获取三级分类导航的数据
  async getCategoryList({ commit }) {
    const result = await reqCategoryList();
    if (result.code === 200) {
      commit("RECEIVE_CATEGORYLIST", result.data);
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
