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
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <!-- 如果有 这里就生成一个面包  很灵活的一种方式，值得借鉴学习 -->
            <!-- 存在categoryName时 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 存在搜索关键字时 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 点击品牌时 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- props -->
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
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
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
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
        //初始化默认的排序规则
        order: "1:desc",
        // 初始化默认的页码
        pageNo: 1,
        // 初始化默认的每页数量
        pageSize: 5,
      },
    };
  },
  components: {
    SearchSelector,
  },
  // 根据路由的变化来动态生成 面包屑  而且路由已经被监听，所以这里的一步不再需要
  // beforeMount() {
  //   let { category1Id, category2Id, category3Id, categoryName } =
  //     this.$route.params;
  //   let { keyword } = this.$route.query;
  //   // 注意这里，因为this.searchParams内部的值只是简单的key-value, 所以可以实现如果有相同的会覆盖，不同的会添加。
  //   // 但是如果这里的内部的值是一个负责的对象，这种方式是无法实现上述的效果！！！！！！

  //   // 前台往后台发数据，如果是undefined是不会带上的，但是如果是空串，他会带上 所以一般要么undefined 要么删除这个字段
  //   let searchParams = {
  //     ...this.searchParams,
  //     category1Id,
  //     category2Id,
  //     category3Id,
  //     categoryName,
  //     keyword,
  //   };

  //   Object.keys(searchParams).forEach((item) => {
  //     if (searchParams[item] === "") {
  //       delete searchParams[item];
  //     }
  //   });
  //   this.searchParams = searchParams;
  // },
  // mounted() {
  //   this.getGoodsListInfo();
  // },
  methods: {
    // 搜索请求方法
    getGoodsListInfo() {
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },
    // 专门处理参数
    handlerSearchParams() {
      // 在这个里面我们需要把搜索的条件参数，给获取到，放到this.searchParams
      let { category1Id, category2Id, category3Id, categoryName } =
        this.$route.query;
      let { keyword } = this.$route.params;
      // ...运算符是最简单的对象浅拷贝
      let searchParams = {
        ...this.searchParams,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
      };

      //
      //1、 功能：把一个对象的可枚举属性放在一个数组里面
      //2、 参数：这个对象
      //3、 返回值：可枚举属性组成的数组
      Object.keys(searchParams).forEach((item) => {
        if (searchParams[item] === "") {
          delete searchParams[item];
        }
      });
      this.searchParams = searchParams;
    },
    // 删除categoyrName   categoyrName, category1Id, category2Id, category3Id是query参数
    removeCategoryName() {
      // 单纯的dispatch是无法修改路径的
      this.searchParams.categoryName = undefined;
      this.$router.push({ name: "search", params: this.$route.params });
    },
    // 删除关键字  -- 关键字是params参数
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.$router.push({
        name: "search",
        query: this.$route.query,
      });

      // 全局事件总线 发射
      this.$bus.$emit("clearKeyword");
    },
    // 点击品牌时的回调
    searchForTrademark(tm) {
      // 后端需要 tm.id:tm.name形式
      this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`;
      this.getGoodsListInfo();
    },
    // 删除面包屑的品牌重新搜索
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getGoodsListInfo();
    },
    // 点击商品属性
    searchForProps(attr, attrValue) {
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 但是这里要注意 去重 避免重复点击相同的
      let isRepeate = this.searchParams.props.some((item) => item === prop);
      if (isRepeate) return;
      this.searchParams.props.push(prop);
      this.getGoodsListInfo();
    },
    // 删除面包屑的属性，重新搜索
    removeProp(index) {
      this.searchParams.props.splice(index, 1);
      this.getGoodsListInfo();
    },
  },
  computed: {
    ...mapGetters(["goodsList"]),
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
