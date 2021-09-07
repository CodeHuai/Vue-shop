import Home from "@/components/Home";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Search from "@/components/Search";

export default [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
];
