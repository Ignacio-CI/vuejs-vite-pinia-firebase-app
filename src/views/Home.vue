<template>
    <div class="h-screen d-flex flex-column justify-start align-center">
        <h1>Home</h1>
        <p>{{ userStore.userData?.email }}</p>

        <v-form class="w-50" @submit.prevent="handleSubmit">
            <v-text-field label="Enter a URL" v-model="url" />
            <v-btn type="submit">Submit</v-btn>
        </v-form>

        <p v-if="databaseStore.loadingDoc">Loading documents...</p>
        <v-list class="mt-4" v-else>
            <v-list-item v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }} => {{ item.name }} => {{ item.short }}
                <v-btn size="sm" class="bg-red mx-2 py-1 px-1" @click="databaseStore.deleteUrl(item.id)">Delete</v-btn>
                <v-btn size="sm" class="bg-blue-grey-darken-4 py-1 px-1" @click="router.push(`/edit/${item.id}`)">Edit</v-btn>
            </v-list-item>
        </v-list>
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
