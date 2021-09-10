import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";

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
  },
  {
    path: "/shopcart",
    component: ShopCart,
  },
];
