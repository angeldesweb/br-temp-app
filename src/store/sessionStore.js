import { writable } from 'svelte/store';

const initialValues = {
    uid:'',
    username:'',
    profile:'default',
    premium:false,
    isAuth:false,
    isVerified:false,
    bio:''
}

const sessionStore = () => {
    const { subscribe , update , set } = writable(initialValues)

    return {
        subscribe,
        login: args => update(store => (store = {...store,...args})),
        add: args => update(store => (store = {...store,...args})),
        close: () => set(initialValues)
    }
};

export const user = sessionStore();