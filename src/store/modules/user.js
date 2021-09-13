import { getUserTempId } from "@/utils/userabout";
import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqGetUserInfo,
  reqUserLogout,
} from "@/api/index";

const state = {
  userTempId: getUserTempId(),
  code: "",
  userInfo: {},
  // 这是为了实现自动登录，是要先从localstorage当中去获取token
  token: localStorage.getItem("token_key"),
};

const mutations = {
  RECEIVE_CODE(state, code) {
    state.code = code;
  },
  RECEIVE_TOKEN(state, token) {
    state.token = token;
  },
  RECEIVE_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  RESET_TOKEN(state) {
    state.token = "";
  },
  RESET_USERINFO(state) {
    state.userInfo = {};
  },
};

const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    const result = await reqGetCode(phone);
    if (result.code === 200) {
      commit("RECEIVE_CODE", result.data);
      return result.data;
    } else {
      return Promise.reject(new Error("验证码获取失败"));
    }
  },
  // 注册
  async userRegister({ commit }, userInfo) {
    const result = await reqUserRegister(userInfo);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("注册失败"));
    }
  },
  // login
  async userLogin({ commit }, userInfo) {
    const result = await reqUserLogin(userInfo);
    if (result.code === 200) {
      //针对用户第一次登录,获取token使用
      commit("RECEIVE_TOKEN", result.data.token);
      localStorage.setItem("token_key", result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("登录失败"));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqGetUserInfo();
    if (result.code === 200) {
      commit("RECEIVE_USERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 清空token
  //清空token信息
  async removeToken({ commit }) {
    localStorage.removeItem("token_key");
    commit("RESET_TOKEN");
  },
  // 退出
  async userLogout({ commit, dispatch }) {
    const result = await reqUserLogout();
    if (result.code === 200) {
      commit("RESET_USERINFO");
      dispatch("removeToken");
      return "OK";
    } else {
      return Promise.reject(new Error("退出失败"));
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
