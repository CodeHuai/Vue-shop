import axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
// 封装axios，必须创建一个新的axios实例去封装
const service = axios.create({
  baseURL: "/api", //所有的接口路径共有的部分 如果这个路径里面没有服务器地址，默认是往本地服务器8080发送
  timeout: 20000,
});

service.interceptors.request.use(
  // 请求拦截器成功的回调
  (config) => {
    Nprogress.start();

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
    // 统一处理请求错误, 具体请求也可以选择处理或不处理
    alert("axios请求失败" + error.message);
    // 后期你还要不要处理，自己选择
    // 如果后期还想要处理，那么需要把这个错误信息继续往下传
    // return Promise.reject(error)  //Promise.reject(new Error('自定义错误信息'))
    // 如果后期不想处理这个错误信息了，那么需要中断promise链
    return new Promise(() => {});
  }
);

export default service;
