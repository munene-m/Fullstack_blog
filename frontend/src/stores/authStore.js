import { ref, computed } from "vue";
import axios from 'axios';
import { defineStore } from "pinia";
// import { beforeRouteEnter } from 'vue-router';
import { useRouter } from "vue-router";

const router = useRouter()

export const useAuthStore = defineStore({
  id:'auth',
  state:()=> ({
    user: JSON.parse(localStorage.getItem("token"))
  }),
  actions:{
    async register(username, email, password){
      const user = await axios.post('http://localhost:5000/auth/register', {username,email,password})
      this.user = user
      localStorage.setItem("token", JSON.stringify(user))
    },
    async login(email, password){
      const user = await axios.post('http://localhost:5000/auth/login', {email, password})
      this.user = user
      localStorage.setItem("token", JSON.stringify(user))
      // const userHome = {
      //   beforeRouteEnter(to,from,next){
      //     if(user){
      //       next({name: 'home'})
      //     }else{
      //       next()
      //     }
      //   }
      // }
    },
    async logOut(){
      this.user = null
      localStorage.removeItem("token")
    }
  }
})
