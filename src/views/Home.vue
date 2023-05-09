<template>
    <div>
        <h1>Home</h1>
        <p>{{ userStore.userData?.email }}</p>

        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Enter URL" v-model="url">
            <button type="submit">Submit</button>
        </form>

        <p v-if="databaseStore.loadingDoc">Loading documents...</p>
        <ul v-else>
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }} => {{ item.name }} => {{ item.short }}
                <button @click="databaseStore.deleteUrl(item.id)">Delete</button>
                <button @click="router.push(`/edit/${item.id}`)">Edit</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/database';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();

const url = ref('');

const handleSubmit = () => {
    if (url.value !== '') {
        databaseStore.addUrl(url.value);
    } else {
        console.log('enter a url');
    }
}

databaseStore.getUrls();
</script>
