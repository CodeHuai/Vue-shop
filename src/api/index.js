//这个文件是专门用来写接口请求函数的
// 每个接口最终都对应了一个函数，我们只需要调用这个函数就能往这个接口发请求拿数据
import Ajax from "@/utils/request";
import mockAjax from "@/utils/mockRequest";

// 请求获取三级分类的数据
//http://39.98.123.211/  服务器地址
///api/product/getBaseCategoryList  //请求路径
//get
export const reqCategoryList = () => {
  return Ajax({
    url: "/product/getBaseCategoryList",
    method: "GET",
  }); //返回的是一个promise对象
};

// 获取首页轮播图
export const reqBannerList = () => {
  return mockAjax({
    url: "/banner",
    method: "GET",
  });
};

//获取首页楼层数据 floor
//get
export const reqFloorList = () => {
  return mockAjax({
    url: "/floor",
    method: "GET",
  });
};

// 请求获取搜索页面数据
// /api/list
// post
//参数例子  请求体参数
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }
// searchParams是一个对象,代表我们的请求体参数
export const reqGoodsListInfo = (searchParams) => {
  return Ajax({
    url: "/list",
    method: "POST",
    data: searchParams,
  });
};

//请求获取详情页数据
// /api/item/{ skuId }
// get
export const reqGoodsDetailInfo = (skuId) => {
  return Ajax({
    url: `/item/${skuId}`,
    method: "GET",
  });
};

//添加购物车的请求
// /api/cart/addToCart/{ skuId }/{ skuNum }
// post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return Ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "POST",
  });
};

// 请求获取购物车列表
// /api/cart/cartList
// get
export const reqShopCartList = () => {
  return Ajax({
    url: "/cart/cartList",
    method: "GET",
  });
};

// 请求修改单个购物车的选中状态
// /api/cart/checkCart/{skuId}/{isChecked}
//  get
export const reqUpdateOneIsCheck = (skuId, isChecked) => {
  return Ajax({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "GET",
  });
};

// 请求修改多个购物车的选中状态
// /api/cart/batchCheckCart/{isChecked}
// post
export const reqUpdateAllIsCheck = (isChecked, skuIdList) => {
  return Ajax({
    url: `/cart/batchCheckCart/${isChecked}`,
    method: "POST",
    data: skuIdList,
  });
};

// 删除单个的 /api/cart/deleteCart/{skuId}
// delete
export const reqDeleteOneCart = (skuId) => {
  return Ajax({
    url: `/cart/deleteCart/${skuId}`,
    method: "DELETE",
  });
};

// /api/cart/batchDeleteCart
// 删除所选的购物车  所有
export const reqDeleteAllCart = (skuIdList) => {
  return Ajax({
    url: `/cart/batchDeleteCart`,
    data: skuIdList,
    method: "DELETE",
  });
};
