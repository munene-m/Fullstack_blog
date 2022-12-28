<script>
import { RouterLink, RouterView } from "vue-router";
import Login from './views/Login.vue'
export default{
  components:{
    Login
  },
  data(){
    return {
      
    }
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="bg-gray-500 flex fex-row justify-between text-black backdrop-filter backdrop-blur-lg bg-opacity-20 border-gray-200 px-2 sm:px-4 py-2.5 rounded">
        <RouterLink to="/">
          Home
        </RouterLink>
        <div class="flex gap-x-4 items-center">
          <RouterLink to="/1">Home</RouterLink>
          <RouterLink to="/blog">Blog</RouterLink>
          <RouterLink to="/login"><button class="text-white bg-purple-600 rounded-md border-none px-4 cursor-pointer py-1">Log in</button></RouterLink>
          <RouterLink to="/sign-up"><button class="text-purple-600 bg-gray-200 rounded-md border-2 border-purple-600 px-4 cursor-pointer py-1">Sign up</button></RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
