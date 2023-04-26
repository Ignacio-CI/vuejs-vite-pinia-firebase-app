<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Enter your email" v-model.trim="email">
            <input type="password" placeholder="Enter your password" v-model.trim="password">
            <button type="submit">Submit</button>
        </form>
    </div> 
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

const email = ref('');
const password = ref('');

const handleSubmit = () => {
    if(!email.value || !password.value.length > 5) {
        return alert('Fill all the fields')
    }
    userStore.registerUser(email.value, password.value);
};
</script>

<style lang="scss" scoped>

</style>