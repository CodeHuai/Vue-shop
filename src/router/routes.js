import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Center from "@/pages/Center";
import Pay from "@/pages/Pay";
import Trade from "@/pages/Trade";
import PaySuccess from "@/pages/PaySuccess";
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";

export default [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/search/:keyword?",
    component: Search,
    name: "search", //命名路由
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isHidden: true,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHidden: true,
    },
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/detail/:skuId",
    component: Detail,
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
    beforeEnter: (to, from, next) => {
      // 路由独享守卫，只和这个路由相关的导航守卫
      let skuNum = to.query.skuNum;
      let skuInfo = sessionStorage.getItem("skuInfo_key");
      if (skuNum && skuInfo) {
        next();
      } else {
        alert(111);
        next(false);
      }
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
  },
  {
    path: "/center",
    component: Center,
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "",
        redirect: "myorder",
      },
    ],
  },
  {
    path: "/pay",
    component: Pay,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      //只有从购物车才能到交易
      if (from.path === "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/trade",
    component: Trade,
    beforeEnter: (to, from, next) => {
      //只有从购物车才能到交易
      if (from.path === "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      //只有从购物车才能到交易
      if (from.path === "/pay") {
        next();
      } else {
        next(false);
      }
    },
  },
];
