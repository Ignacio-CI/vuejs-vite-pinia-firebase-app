<template>
    <div>
        <h1>URL Shortener</h1>
        <nav v-if="!userStore.loadingSession">
            <router-link to="/" v-if="userStore.userData">Home</router-link>
            <router-link to="/login" v-if="!userStore.userData">Login</router-link>
            <router-link to="/register" v-if="!userStore.userData">Register</router-link>
            <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
        </nav>
        <div v-else>
            <p>Loading...</p>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { useUserStore } from './stores/user'
const userStore = useUserStore();

</script>
