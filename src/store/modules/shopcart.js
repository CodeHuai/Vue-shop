import {
  reqAddOrUpdateShopCart,
  reqShopCartList,
  reqUpdateOneIsCheck,
  reqUpdateAllIsCheck,
  reqDeleteOneCart,
  reqDeleteAllCart,
} from "@/api";

const state = {
  shopCartList: [],
};
const mutations = {
  RECEIVE_SHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};

const actions = {
  // 添加购物车 以及修改数量的接口
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
  // 修改单个状态
  async updateOneIsCheck({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateOneIsCheck(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 修改多个选中状态
  async updateAllIsCheck({ commit }, { isChecked, skuIdList }) {
    const result = await reqUpdateAllIsCheck(isChecked, skuIdList);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 删除单个的
  async deleteOneCart({ commit }, cartinfo) {
    const result = await reqDeleteOneCart(cartinfo.skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 删除所选的所有购物车
  async deleteAllCart({ commit }, skuIdList) {
    const result = await reqDeleteAllCart(skuIdList);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
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
