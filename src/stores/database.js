import { defineStore } from "pinia";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite';
import { auth, db } from '../firebaseConfig';
import { nanoid } from "nanoid";
import router from '../router'

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: [],
        loadingDoc: false,
    }),
    actions: {
        async getUrls(){
            if (this.documents.length !== 0) {
                return;
            }

            this.loadingDoc = true;
            try {
               const q = query(collection(db, "urls"), where("user", "==", auth.currentUser.uid));

               const querySnapshot = await getDocs(q);
               querySnapshot.forEach(doc => {
                this.documents.push({
                    id: doc.id,
                    ...doc.data(),
                })
               })
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingDoc = false;
            }
        },

        async addUrl(name) {
            try {
                const docObj = {
                    name,
                    short: nanoid(6),
                    user: auth.currentUser.uid,
                }
                const docRef = await addDoc(collection(db, "urls"), docObj);
                this.documents.push({
                    ...docObj,
                    id: docRef.id,
                }) 
            } catch (error) {
                console.log(error);
            }
        },

        async readUrl(id) {
            this.loadingDoc = true;
            try {
                const docRef = doc(db, "urls", id);

                const docSnapshot = await getDoc(docRef);

                if(!docSnapshot.exists()) {
                    throw new Error('Document not found');
                }

                if(docSnapshot.data().user !== auth.currentUser.uid) {
                    throw new Error('This document belongs to another user');
                }

                return docSnapshot.data().name;
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingDoc = false;
            }
        },

        async updateUrl(id, name) {
            const docRef = doc(db, 'urls', id);

            const docSnapshot = await getDoc(docRef);

            if(!docSnapshot.exists()) {
                throw new Error('Document not found');
            }

            if(docSnapshot.data().user !== auth.currentUser.uid) {
                throw new Error('This document belongs to another user');
            }

            await updateDoc(docRef, {name});

            this.documents.map(doc => doc.id === id ? ({...doc, name: name}) : doc);
            router.push('/');
        },

        async deleteUrl(id) {
            try {
                const docRef = doc(db, 'urls', id);

                const docSnapshot = await getDoc(docRef);

                if(!docSnapshot.exists()) {
                    throw new Error('Document not found');
                }

                if(docSnapshot.data().user !== auth.currentUser.uid) {
                    throw new Error('This document belongs to another user');
                }

                await deleteDoc(docRef);
                this.documents = this.documents.filter(doc => doc.id !== id);
            } catch (error) {
                console.log(error.message);
            } finally {

            }
        },        
    }
})