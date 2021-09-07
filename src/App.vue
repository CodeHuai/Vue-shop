<template>
  <div>
    <Header></Header>

    <router-view></router-view>
    <!-- 这样根据当前匹配的路由对象的路径去判断显示或者隐藏是可以的，但是不好 -->
    <!-- <Footer v-show="$route.path !== '/login' && $route.path !== '/register'"></Footer> -->
    <Footer v-show="!$route.meta.isHidden"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="less" scoped></style>
