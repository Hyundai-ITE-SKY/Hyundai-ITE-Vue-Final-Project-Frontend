export default [
  {
    path: "/member",
    component: () => import(/* webpackChunkName: "member" */ "../views/member/MyPage"),
  },
  {
    path: "/member/wishlist",
    component: () => import(/* webpackChunkName: "member" */ "../views/member/WishList"),
  },
];