<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="prop"
            >
              {{ prop.split(":")[1] }}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @searchForTrademark="searchForTrademark"
          @searchForProps="searchForProps"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!--
                  1、背景色应该是动态的，根据排序标志动态设定class
                  2、字体图标
                    >1、使用哪个字体图标  iconfont
                    >2、字体图标哪个有 条件和背景色一样，根据排序标志动态设定
                    >3、如果有字体图标，是向上还是向下，根据排序类型决定
                 -->
                <!-- 这里的 1代表综合排序 2代表价格排序   -->
                <li :class="{ active: orderFlag === '1' }">
                  <a href="javascript:;" @click="changeOrder('1')">
                    综合
                    <i
                      class="iconfont"
                      :class="{
                        icondown: orderType === 'desc',
                        iconup: orderType === 'asc',
                      }"
                      v-if="orderFlag === '1'"
                    ></i>
                  </a>
                </li>
                <li :class="{ active: orderFlag === '2' }">
                  <a href="javascript:;" @click="changeOrder('2')">
                    价格
                    <i
                      class="iconfont"
                      :class="{
                        icondown: orderType === 'desc',
                        iconup: orderType === 'asc',
                      }"
                      v-if="orderFlag === '2'"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank">
                      <img :src="goods.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>&nbsp;{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html">
                      {{ goods.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 连续数量一般都是奇数 -->
          <Pagination
            :currentPageNo="searchParams.pageNo"
            :continueNo="5"
            :total="goodsListInfo.total"
            :pageSize="searchParams.pageSize"
            @changePageNo="getGoodsListInfo"
          >
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      // searchParams是一个对象，里面包含所有的搜索条件，只是一上来大部分的搜索条件都是初始化为空
      // 今后想要按照哪个条件进行搜索，只需要把其中的某个条件修改，然后发送请求就可以了
      // 这个就是我们的初始化搜索参数
      searchParams: {
        // 初始化默认的搜索条件
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",

        order: "2:asc", //初始化默认的排序规则
        //1:desc  冒号前面代表排序标志，冒号后面代表排序类型
        // 前面为1代表是综合排序  前面为2代表价格排序
        // asc代表升序  desc代表降序

        pageNo: 1, // 初始化默认的页码
        pageSize: 10, // 初始化默认的每页数量
      },
    };
  },
  components: {
    SearchSelector,
  },
  // beforeMount() {
  //   // // 在这个里面我们需要把搜索的条件参数，给获取到，放到this.searchParams
  //   // let { category1Id, category2Id, category3Id, categoryName } =
  //   //   this.$route.query;
  //   // let { keyword } = this.$route.params;
  //   // // ...运算符是最简单的对象浅拷贝
  //   // let searchParams = {
  //   //   ...this.searchParams,
  //   //   category1Id,
  //   //   category2Id,
  //   //   category3Id,
  //   //   categoryName,
  //   //   keyword,
  //   // };

  //   // //
  //   // //1、 功能：把一个对象的可枚举属性放在一个数组里面
  //   // //2、 参数：这个对象
  //   // //3、 返回值：可枚举属性组成的数组
  //   // Object.keys(searchParams).forEach((item) => {
  //   //   if (searchParams[item] === "") {
  //   //     delete searchParams[item];
  //   //   }
  //   // });
  //   // // 如果发请求传递的是undefined，那么这个参数是不会带过去的
  //   // // 如果发请求传递的是空串，那么空串也是要带过去的，会增加我们的带宽，浪费资源
  //   // // 以后如果我们发现请求里面是带的空串，要么删除这一项，要么改为undefined
  //   // this.searchParams = searchParams;

  //   this.handlerSearchParams()
  // },

  // mounted() {
  //   this.getGoodsListInfo();
  // },
  methods: {
    getGoodsListInfo(page = 1) {
      // 我们一开始写的搜索参数是一个空的对象，这个空的对象是我们测试的时候不知道传递啥搜索参数
      // 但是它可以让我们获取到一批默认的测试数据，我们可以展示页面
      // 这里如果就写成是空的对象，代表我们跳转到search页面，搜索条件什么都没有。就是说没有按照任何条件搜索过
      // this.$store.dispatch("getGoodsListInfo", {});
      this.searchParams.pageNo = page;
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
      // 用户从首页跳转到search页面，默认就会按照三级分类名称和关键字进行搜索，这个请求其实就是要第一次搜索用的
      // 我们想要让这个请求是按照三级分类名称和关键字进行搜索，那么必须在它发送之前，把用户传递的参数，给获取到
      // 添加到this.searchParams
    },

    // 专门处理参数
    handlerSearchParams() {
      // 在这个里面我们需要把搜索的条件参数，给获取到，放到this.searchParams
      let { category1Id, category2Id, category3Id, categoryName } =
        this.$route.query;
      let { keyword } = this.$route.params;
      // ...运算符是最简单的对象浅拷贝

      // 注意这里  只有当内部的数据属于简单的类型，才会达到有则覆盖，无则添加的效果。  一旦内部是一个对象，
      // 只会造成一个对象的合并，而不是去重或者添加 而是整体合并 ！！！！！
      let searchParams = {
        ...this.searchParams,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
      };

      //1、 功能：把一个对象的可枚举属性放在一个数组里面
      //2、 参数：这个对象
      //3、 返回值：可枚举属性组成的数组
      Object.keys(searchParams).forEach((item) => {
        if (searchParams[item] === "") {
          delete searchParams[item];
        }
      });
      this.searchParams = searchParams;
      // this.searchParams.pageNo = 1
    },

    // 删除搜索条件三级分类名称
    removeCategoryName() {
      //把搜索条件当中的三级分类名称删除，重新发送请求
      this.searchParams.categoryName = undefined;
      // this.getGoodsListInfo()  不能这样发请求，因为这样发请求，请求是可以发的，但是路径是没法改变
      // this.$route 代表我们匹配的当前的路由对象，只能读不能自己随意更改
      // this.searchParams.pageNo = 1
      this.$router.replace({ name: "search", params: this.$route.params });
      // 我这里其实并没有法请求，只是在修改路径，修改了路径，那么路由对象就会发生改变，然后就会进入到watch里面自动
      // 发请求
    },
    // 删除搜索条件关键字
    removeKeyword() {
      //把搜索条件当中的三级分类名称删除，重新发送请求
      this.searchParams.keyword = undefined;
      // this.getGoodsListInfo()  不能这样发请求，因为这样发请求，请求是可以发的，但是路径是没法改变
      // this.$route 代表我们匹配的当前的路由对象，只能读不能自己随意更改
      // this.searchParams.pageNo = 1
      this.$router.replace({ name: "search", query: this.$route.query });
      // 我这里其实并没有法请求，只是在修改路径，修改了路径，那么路由对象就会发生改变，然后就会进入到watch里面自动
      // 发请求

      // 找到bus，调用emit,发送数据
      this.$bus.$emit("clearKeyword");
    },

    // 根据点击品牌搜索
    searchForTrademark(tm) {
      this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`;
      this.getGoodsListInfo();
    },

    // 删除面包屑的品牌重新搜索
    removeTrademark() {
      this.searchParams.trademark = undefined;
      // this.searchParams.pageNo = 1
      this.getGoodsListInfo();
    },
    // 按照属性进行搜索
    searchForProps(attr, attrValue) {
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;

      let isRepeate = this.searchParams.props.some((item) => item === prop);
      if (isRepeate) return;
      this.searchParams.props.push(prop);
      // this.searchParams.pageNo = 1
      this.getGoodsListInfo();
    },
    // 删除面包屑的属性，重新搜索
    removeProp(index) {
      this.searchParams.props.splice(index, 1);
      this.getGoodsListInfo();
    },

    // 点击综合和价格排序
    changeOrder(orderFlag) {
      //判断用户点击的标志是不是和原来的数据标志一样
      //先获取到原来排序的标志
      let originFlag = this.searchParams.order.split(":")[0]; //代表原来的排序标志
      let originType = this.searchParams.order.split(":")[1]; //代表原来的排序类型
      let newOrder = "";

      if (orderFlag === originFlag) {
        //代表用户点的和原来一样的标志，值需要修改标志的类型
        newOrder = `${originFlag}:${originType === "asc" ? "desc" : "asc"}`;
      } else {
        newOrder = `${orderFlag}:desc`;
      }
      //修改数据重新发请求
      this.searchParams.order = newOrder;
      this.getGoodsListInfo();
    },
    // 点击分页器重新设置页码发请求
    // changePageNo(page){
    //   this.searchParams.pageNo = page
    //   this.getGoodsListInfo()
    // }
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      goodsListInfo: (state) => state.search.goodsListInfo,
    }),
    orderFlag() {
      return this.searchParams.order.split(":")[0];
    },
    orderType() {
      return this.searchParams.order.split(":")[1];
    },
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        this.handlerSearchParams();
        this.getGoodsListInfo();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
