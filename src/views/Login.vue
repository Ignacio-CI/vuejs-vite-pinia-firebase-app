<template>
    <div>
        <p>{{ upperCaseText }}</p>
        <p>{{ userStore.lowercase }}</p>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { computed } from 'vue';
const userStore = useUserStore();

const upperCaseText = computed(() => userStore.userData.toUpperCase());
</script>

<style lang="scss" scoped>

</style>