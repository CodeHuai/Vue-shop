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
  },
  {
    path: "/trade",
    component: Trade,
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
  },
];
