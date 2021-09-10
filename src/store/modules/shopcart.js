import { reqAddOrUpdateShopCart, reqShopCartList } from "@/api";

const state = {
  shopCartList: [],
};
const mutations = {
  RECEIVE_SHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};

const actions = {
  // 添加购物车
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code === 200) {
      // 代表添加购物车成功
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 获取用户的购物车列表
  async getShopCartList({ commit }) {
    const result = await reqShopCartList();
    if (result.code === 200) {
      commit("RECEIVE_SHOPCARTLIST", result.data);
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
