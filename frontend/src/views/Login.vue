<template>
    <section class="grid h-3/4 place-items-center pt-14">
        <div class="max-w-sm w-72 mt-14 md:w-96 md:mb-6 border-none">
            <!-- <p v-if="authStore.user">Login successful</p> -->
            <form
                class="w-96 px-6 py-16 items-center flex flex-col justify-center bg-slate-800 border rounded-xl shadow-sm"
                @submit.prevent="handleSubmit">
                <div class="grid-center pb-8">
                    <h3 class="font-bold text-gray-300 text-xl md:text-2xl">Welcome back!</h3>
                </div>
                <div class="relative z-0 pb-4">
                    <input type="email" v-model="formData.email"
                        class="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                    <label for="email"
                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    <p class="text-red-500 pt-1 text-sm" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
                </div>
                <div class="relative z-0 pb-4">
                    <input type="password" v-model="formData.password"
                        class="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                    <label for="password"
                        class="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    <p class="text-red-500 pt-1 text-sm" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}
                    </p>
                </div>
                <div class="flex flex-col relative pb-4">
                    <h4 class="text-white text-sm cursor-pointer md:text-base">Don't have an account?<span
                            class="text-purple-500 font-bold hover:text-purple-700">
                            <RouterLink to="/sign-up">Sign up</RouterLink>
                        </span></h4>
                </div>
                <div>
                    <button type="submit"
                        class="text-white bg-purple-600 rounded-md border-none px-4 cursor-pointer py-2">Log in</button>
                </div>
            </form>

        </div>
    </section>

</template>

<script setup>
import { reactive, watch, computed, watchEffect, ref } from 'vue';
import useVuelidate from '@vuelidate/core'
import { required, minLength, email, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from "vue-router"

const authStore = useAuthStore()
const router = useRouter()
const error = ref("")
const loginStatus = ref()
const formData = reactive({
    email: "",
    password: "",
})
const token = ref("");

const rules = computed(() => {
    return {
        email: { required: helpers.withMessage("Email is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength: minLength(6) },
    }
})
const v$ = useVuelidate(rules, formData)
const handleSubmit = async () => {
    const result = await v$.value.$validate()
    if (result) {
        try {
            authStore.login(formData.email, formData.password)
            console.log(authStore.user.data._id)
            if(authStore.user){
                router.push({name: 'home', params: { userId : authStore.data.user._id }})
            console.log(authStore.user.data._id)

            }
        } catch (err) {
            error.value = err.message;
            setTimeout(() => {
                error.value = ""
            }, 2000)
        }
    }
    setTimeout(() => {
        formData.email = "",
            formData.password = ""
    }, 1000);


watchEffect(() => {
    token.value = authStore.user
    if(token.value) {
        router.push("/")
    }
})

}
</script>