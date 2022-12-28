<template>
    <section class="grid h-3/4 place-items-center pt-4">
    <div class="max-w-sm w-72 mt-14 md:w-96 md:mb-6 border-none">
        <form class="w-full px-6 py-16 items-center flex flex-col justify-center bg-slate-800 border rounded-xl shadow-sm" @submit.prevent="handleSubmit">
            <div class="grid-center pb-8">
                <h3 class="font-bold text-gray-300 text-xl md:text-2xl">Create your account.</h3>
            </div>
            <div class="relative z-0 pb-4">
                <input type="text" v-model="formData.username" class="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                <label for="username" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                <p class="text-red-500 text-sm pt-1" v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</p>
            </div>
            <div class="relative z-0 pb-4">
                <input type="email" v-model="formData.email" class="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                <label for="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                
                <p class="text-red-500 pt-1 text-sm" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
            </div>
            <div class="relative z-0 pb-4">
                <input type="password" v-model="formData.password" class="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                <label for="password" class="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                <p class="text-red-500 pt-1 text-sm" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
            </div>
            <div class="relative z-0 pb-4">
                <input type="password" v-model="formData.confirmPassword" class="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                <label for="confirmPassword" class="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                <p class="text-red-500 pt-1 text-sm" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
            </div>
            
            <div class="pt-6">
                <button type="submit" class="text-white bg-purple-600 rounded-lg border-none px-4 cursor-pointer py-2">Create account</button>
            </div>
        </form>

    </div>
</section>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, minLength, email, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const formData = reactive({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
})

const rules = computed(() => {
    return{
        username: { required: helpers.withMessage("Username is required", required) },
        email: { required: helpers.withMessage("Email is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength:minLength(6)},
        confirmPassword: { required: helpers.withMessage("The entered passwords do not match", required), sameAs: sameAs(formData.password) }
    }
})
const v$ = useVuelidate(rules, formData)
const handleSubmit = async () =>{
    const result = await v$.value.$validate()
    if(result){
        authStore.register(formData.username, formData.email, formData.password)
        router.push("/login")
    }
    setTimeout(() => {
        formData.username = "",
        formData.email = "",
        formData.password  = "",
        formData.confirmPassword = ""
    }, 1000)
}
</script>