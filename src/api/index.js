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
    method: "post",
    data: searchParams,
  });
};

//请求获取详情页数据
// /api/item/{ skuId }
// get
export const reqGoodsDetailInfo = (skuId) => {
  return Ajax({
    url: `/item/${skuId}`,
    method: "get",
  });
};

//添加购物车的请求
// /api/cart/addToCart/{ skuId }/{ skuNum }
// post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return Ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};
