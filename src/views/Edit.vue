<template>
    <div>
        <h1>Edit id: route.params</h1>

        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Enter URL" v-model="url">
            <button type="submit">Edit</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database'

const databaseStore = useDatabaseStore();
const route = useRoute();
const url = ref('')

const handleSubmit = () => {
    if (url.value !== '') {
        databaseStore.updateUrl(route.params.id, url.value);
    } else {
        console.log('enter a url');
    }
}

onMounted(async() => {
    url.value = await databaseStore.readUrl(route.params.id);
})
</script>
