import { reqGoodsListInfo } from "@/api";

const state = {
  goodsListInfo: {},
};
const mutations = {
  RECEIVE_GOODSLISTINFO(state, goodsListInfo) {
    state.goodsListInfo = goodsListInfo;
  },
};
const actions = {
  // action函数,第一个形参必须context,就算不用也必须写用于占位
  // 如果在vue当中要传递过来参数,只能传递一个参数,需要传递多个的时候,必须封装在对象里面传递
  async getGoodsListInfo({ commit }, searchParams) {
    const result = await reqGoodsListInfo(searchParams);
    if (result.code === 200) {
      commit("RECEIVE_GOODSLISTINFO", result.data);
    }
  },
};
const getters = {
  attrsList(state) {
    //添加||[]是为了一开始防止组件拿到undefined
    return state.goodsListInfo.attrsList || [];
  },

  goodsList(state) {
    return state.goodsListInfo.goodsList || [];
  },

  trademarkList(state) {
    return state.goodsListInfo.trademarkList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
