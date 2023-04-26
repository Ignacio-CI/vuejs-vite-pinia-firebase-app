import { createUserWithEmailAndPassword } from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../firebaseConfig";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: null,
    }),
    actions: {
        async registerUser(email, password) {
            try {
                const {user} = await createUserWithEmailAndPassword(auth, email, password);
                console.log(user);
                this.userData = {email: user.email, id: user.uid};
            } catch (error) {
                console.log(error)
            }
        }
    }
});