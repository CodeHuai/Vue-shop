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

// 验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => {
  return Ajax({
    url: `/user/passport/sendCode/${phone}`,
    method: "GET",
  });
};

// 注册
// /api/user/passport/register
// POST
export const reqUserRegister = (userInfo) => {
  return Ajax({
    url: `/user/passport/register`,
    method: "POST",
    data: userInfo,
  });
};

// login
// /api/user/passport/login
// post
export const reqUserLogin = (userInfo) => {
  return Ajax({
    url: "/user/passport/login",
    method: "POST",
    data: userInfo,
  });
};

// 根据token获取用户信息
// /api/user/passport/auth/getUserInfo
// get
export const reqGetUserInfo = () => {
  return Ajax({
    url: "/user/passport/auth/getUserInfo",
    method: "GET",
  });
};

// /api/user/passport/logout
// 退出
// get
export const reqUserLogout = () => {
  return Ajax({
    url: "/user/passport/logout",
    method: "GET",
  });
};

// 请求获取交易信息
// /api/order/auth/trade
// get
export const reqTradeInfo = () => {
  return Ajax({
    url: "/order/auth/trade",
    method: "get",
  });
};

// /api/user/userAddress/auth/findUserAddressList
// 获取用户地址信息
// get
export const reqUserAddressList = () => {
  return Ajax({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
};

// 请求提交创建订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
// POST
export const reqSubmitOrder = (tradeNo, tradeInfo) => {
  return Ajax({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data: tradeInfo,
  });
};

//
//  {
//    reqAddOrUpdateShopCart,
//    reqBannerList
//    ....
//  }

// 请求获取订单支付信息
// /api/payment/weixin/createNative/{orderId}
// get
export const reqPayInfo = (orderId) => {
  return Ajax({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};

// 请求获取订单支付状态
// /api/payment/weixin/queryPayStatus/{orderId}
// get
export const reqPayStatus = (orderId) => {
  return Ajax({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
};
