<template>
    <div>
        <h1>Register</h1>
        <button @click="useStore.registerUser('Ignacio')">Submit</button>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
const useStore = useUserStore();

</script>

<style lang="scss" scoped>

</style>