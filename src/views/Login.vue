<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Enter your email" v-model.trim="email">
            <input type="password" placeholder="Enter your password" v-model.trim="password">
            <button type="submit" :disabled="userStore.loadingUser">Login</button>
        </form>
    </div> 
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
//import { useRouter } from 'vue-router';

const userStore = useUserStore();
//const router = useRouter();

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
    if(!email.value || !password.value.length > 5) {
        return alert('Fill all the fields')
    }
    await userStore.loginUser(email.value, password.value);
    //router.push('/');
};
</script>
