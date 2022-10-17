import { writable , derived } from 'svelte/store';

export const initial = {
    city:'',
    operation:'',
    category:'',
    min:null,
    max:null,
    rooms:null,
    baths:null,
    parks:null
};

const filterStore = () => {
    const { subscribe , update , set } = writable(initial);

    return {
        subscribe,
        add: args => update(store => (store = {...store,...args})),
        restoreVal: (key) => update(store => (store = {...store,[key]:initial[key]})),
        reset: () => set(initial)
    }
};

export const filters = filterStore();

export const isCleaned = derived(filters,$filters => JSON.stringify($filters) === JSON.stringify(initial))