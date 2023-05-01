<template>
    <div>
        <h1>Home</h1>
        <p>{{ userStore.userData?.email }}</p>
        <ul>
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }} => {{ item.name }} => {{ item.short }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/database';

const userStore = useUserStore();
const databaseStore = useDatabaseStore();

databaseStore.getUrls();
</script>
