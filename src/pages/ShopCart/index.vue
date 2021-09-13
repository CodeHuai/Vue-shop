<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-for="(cart, index) in shopCartList" :key="index">
        <ul
          class="cart-list"
          v-for="(cartinfo, index) in cart.cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartinfo.isChecked"
              @click="updateOneIsCheck(cartinfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartinfo.imgUrl" />
            <div class="item-msg">{{ cartinfo.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartinfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeNum(-1, cartinfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartinfo.skuNum"
              minnum="1"
              class="itxt"
              @change="
                changeNum($event.target.value * 1 - cartinfo.skuNum, cartinfo)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeNum(1, cartinfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartinfo.skuNum * cartinfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(cartinfo)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allMoney }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    // 获取购物车列表
    this.getShopCartList();
  },
  methods: {
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },
    // 加减修改购物车数量
    async changeNum(disNum, cartInfo) {
      // 如果最终值小于1 不符合  所以需要将最终值修正为1
      if (disNum + cartInfo.skuNum < 1) {
        disNum = 1 - cartInfo.skuNum;
      }

      try {
        // addOrUpdateShopCart
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        this.getShopCartList();
      } catch (error) {
        console.log(error.message);
      }
    },
    // 单个状态修改 skuId, isChecked
    async updateOneIsCheck(cartInfo) {
      try {
        await this.$store.dispatch("updateOneIsCheck", {
          skuId: cartInfo.skuId,
          isChecked: cartInfo.isChecked ? 0 : 1,
        });
        this.getShopCartList();
      } catch (error) {
        console.log(error.message);
      }
    },
    // 删除单个的
    async deleteOne(cartinfo) {
      try {
        await this.$store.dispatch("deleteOneCart", cartinfo);
        this.getShopCartList();
      } catch (error) {
        console.log(error.message);
      }
    },
    // 删除所选所有购物车
    async deleteAll() {
      let skuIdList = [];
      skuIdList = this.shopCartList.reduce((pre, item) => {
        pre.push(
          ...item.cartInfoList.reduce((pre1, item1) => {
            if (item1.isChecked) {
              pre1.push(item1.skuId);
            }
            return pre1;
          }, [])
        );
        return pre;
      }, []);

      // console.log(skuIdList);

      try {
        await this.$store.dispatch("deleteAllCart", skuIdList);
        this.getShopCartList();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState({
      shopCartList: (state) => state.shopcart.shopCartList,
    }),
    // 记住： 有关于 数量的总和，乃至价钱的总和，后续都是需要通过计算属性进行得到  reduce
    // 总数量
    checkedNum() {
      return this.shopCartList.reduce((pre, item) => {
        pre += item.cartInfoList.reduce((pre1, item1) => {
          if (item1.isChecked) {
            // 注意这里 可不能直接return 因为这会导致直接结束了内层的循环
            pre1 += item1.skuNum;
          }
          return pre1;
        }, 0);
        return pre;
      }, 0);
    },
    // 总价
    allMoney() {
      return this.shopCartList.reduce((pre, item) => {
        pre += item.cartInfoList.reduce((pre1, item1) => {
          if (item1.isChecked) {
            pre1 += item1.skuNum * item1.cartPrice;
          }
          return pre1;
        }, 0);
        return pre;
      }, 0);
    },
    // 全选
    isCheckAll: {
      // 非常巧妙
      get() {
        return (
          this.shopCartList.every((item) =>
            item.cartInfoList.every((item1) => item1.isChecked)
          ) && this.shopCartList.length > 0
        );
      },
      async set(val) {
        let isChecked = val ? 1 : 0;
        let skuIdList = [];
        // 这里是将与全选按钮状态不同的id存储到数组中,因为后端需要用数组
        this.shopCartList.forEach((item) => {
          item.cartInfoList.forEach((item1) => {
            if (item1.isChecked !== isChecked) {
              skuIdList.push(item1.skuId);
            }
          });
        });
        try {
          await this.$store.dispatch("updateAllIsCheck", {
            isChecked: isChecked,
            skuIdList: skuIdList,
          });
          this.getShopCartList();
        } catch (error) {
          console.log(error.message);
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
