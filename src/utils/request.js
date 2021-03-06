import axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
// 封装axios，必须创建一个新的axios实例去封装
const service = axios.create({
  baseURL: "/api", //所有的接口路径共有的部分 如果这个路径里面没有服务器地址，默认是往本地服务器8080发送
  timeout: 20000,
});

service.interceptors.request.use(
  // 请求拦截器成功的回调
  (config) => {
    Nprogress.start();

    let userTempId = store.state.user.userTempId;
    if (userTempId) {
      // 设置请求头
      config.headers.userTempId = userTempId;
    }

    // 携带token 其实就是我们的正式的标识
    let token = store.state.user.token;
    if (token) {
      config.headers.token = token;
    }

    return config;
  }
  // 请求拦截器失败的回调一般不写
  // () => {}
);

service.interceptors.response.use(
  (response) => {
    Nprogress.done();
    return response.data; // 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
  },
  (error) => {
    Nprogress.done();
    return new Promise(() => {});
  }
);

export default service;
