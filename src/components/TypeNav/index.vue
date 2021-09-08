<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOutDiv" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <!-- 这里的 name 是对于vue中动画操作 自己命名的设置 -->
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                :class="{ item_on: currentIndex === index }"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="moveInItem(index)"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          href="javascript:;"
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            href="javascript:;"
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 参考值思想
      currentIndex: -1,
      // 是否显示
      isShow: true,
    };
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  methods: {
    // 当鼠标移入时的操作
    moveInItem: throttle(
      function (index) {
        this.currentIndex = index;
      },
      50,
      { trailing: false }
    ),

    // 点击三级分类
    toSearch(event) {
      let target = event.target;
      let dataset = target.dataset;
      let { category1id, category2id, category3id, categoryname } = dataset;
      if (categoryname) {
        // categoryname有就代表点的就是a标签
        let location = {
          name: "search",
        };
        let query = {
          categoryName: categoryname,
        };
        if (category1id) {
          //点的一级
          query.category1Id = category1id;
        } else if (category2id) {
          //点的二级
          query.category2Id = category2id;
        } else {
          //点的三级
          query.category3Id = category3id;
        }
        location.query = query;

        //点击三级分类跳转之前，先看看之前有没有带params参数，如果有，把之前的params参数也给鞋带上
        // if(this.$route.params){
        location.params = this.$route.params;
        // }

        this.$router.push(location);
      }
    },
    // 移出div home隐藏23级分类  search全部隐藏
    moveOutDiv() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
  },

  computed: {
    // 这里不能使用数组
    // 使用数组必须 1、两边名字一样 2、不能使用vuex模块化
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: hotpink;
      z-index: 999;

      &.sort-enter {
        height: 0;
        opacity: 0;
      }
      &.sort-enter-to {
        height: 461px;
        opacity: 1;
      }

      &.sort-enter-active {
        transition: all 0.5s;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 555px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: greenyellow;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
