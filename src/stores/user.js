import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: 'someone@example.com',
    }),
    // example using getters and actions
    getters: {
        lowercase(state) {
            return state.userData.toLowerCase()
        }
    },
    actions: {
        registerUser(name) {
            this.userData = name;
        }
    }
});