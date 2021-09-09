import Mock from "mockjs";
import banner from "./banner.json";
import floor from "./floor.json";

// 下面这两行就是在真正的模拟接口  第一个参数，传递路径，第二个参数传递数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
