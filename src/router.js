import { createRouter, createWebHistory } from "vue-router";
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Edit from './views/Edit.vue';
import { useUserStore } from './stores/user'

const requireAuth = async (to, from, next) => {
    const userStore = useUserStore();
    userStore.loadingSession = true;
    const user = await userStore.currentUser();
    if (user) {
        next();
    } else {
        next("/login");
    }
    userStore.loadingSession = false;
}

const routes = [
    { path: '/', component: Home, beforeEnter: requireAuth },
    { path: '/edit/:id', component: Edit, beforeEnter: requireAuth },
    { path: '/login', component: Login},
    { path: '/register', component: Register}
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;

/**
|--------------------------------------------------
| This is a simple example of how to route routes in Vue.js. 
| Once you have configurated and exported your routes, you must import the router in main.js file.
|--------------------------------------------------
*/