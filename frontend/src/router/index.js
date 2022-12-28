import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:userId",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Blog.vue"),
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
    },
  ],
});

const currentUser = () => {
  return new Promise((resolve, reject) => {
    const authStore  = useAuthStore()
    const token = authStore.user
    resolve(token)
    reject
  })
}

router.beforeEach( async (to, from, next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if(await currentUser()) {
      next();
    } else {
      next("/:userId")
    }
  } else {
    next();
  }
})


export default router;
