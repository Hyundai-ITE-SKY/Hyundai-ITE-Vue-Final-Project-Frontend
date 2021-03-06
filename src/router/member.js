export default [
  {
    path: "/member/mypage",
    component: () => import(/* webpackChunkName: "member" */ "../views/member/MyPage"),
  },
  {
    path: "/member/wishlist",
    component: () => import(/* webpackChunkName: "member" */ "../views/member/WishList"),
  },
  {
    path: "/member/cart",
    component: () => import(/* webpackChunkName: "member" */ "../views/member/Cart"),
  },
  {
    path: "/member/qna",
    component: () => import(/* webpackChunkName: "member" */ "../views/member/QnA"),
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "member" */ "../views/member/Login"),
  },
];
