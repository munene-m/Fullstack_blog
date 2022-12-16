import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/About.vue"),
    },
    {
      path:"/login",
      name: "login",
      component: () => import("../views/Login.vue")
    },
    {
      path:"/sign-up",
      name: "signup",
      component: () => import("../views/Signup.vue")
    }
  ],
});

export default router;
