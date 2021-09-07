//这个文件是专门用来写接口请求函数的
// 每个接口最终都对应了一个函数，我们只需要调用这个函数就能往这个接口发请求拿数据
import Ajax from '@/utils/request'
// 请求获取三级分类的数据
//http://39.98.123.211/  服务器地址
///api/product/getBaseCategoryList  //请求路径 
//get

export const reqCategoryList = () => {
  return Ajax({
    url:'/product/getBaseCategoryList',
    method:'get'
  })//返回的是一个promise对象
}

// reqCategoryList()