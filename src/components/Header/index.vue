<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <!-- <a href="###">登录</a> -->
            <router-link class="register" to="/register">免费注册</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
                        <img src="./images/logo.png" alt="">
                    </a> -->
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    this.$bus.$on("clearKeyword", () => {
      this.keyword = "";
    });
  },
  methods: {
    toSearch() {
      // 三种
      // 第一种字符串拼接
      // 第二种es6模板字符串
      // 第三种使用对象写法
      // this.$router.push('/search/'+this.keyword + '?keyword1=' + this.keyword.toUpperCase())
      // this.$router.push(`/search/${this.keyword}?keyword1=${this.keyword.toUpperCase()}`)

      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
        // query:{keyword1:this.keyword.toUpperCase()}
      };

      // 点击搜索按钮的时候，跳转之前看看之前有没有带query参数，如果有吧query参数也会带上
      // if(this.$route.query){
      location.query = this.$route.query;
      // }

      this.$router.push(location);
      // .catch(() => {})

      // 面试问题3: 指定params参数时可不可以用path和params配置的组合?（对象写法）
      // 不可以用path和params配置的组合,
      // 只能用name和params配置的组合
      // query配置可以与path或name进行组合使用

      // this.$router.push({
      //   // path:'/search',
      //   name:'search',
      //   params:{keyword:this.keyword||undefined},
      // })
    },
  },
  // 1、调试工具当中可以根据name搜索组件
  // 2、全局注册组件的时候 Vue.component('Header',组件)或者Vue.component(组件.name,组件)
  // 3、<keep-alive include="Header"></keep-alive>
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
