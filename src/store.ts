import Vue from 'vue';
import { Store } from "vuex";
import { HomeStore } from './pages/home/store';
import { ContainerStore } from './layout/store';

const store = new Store({
    namespaced: true,
    modules: {
        [HomeStore.id]: HomeStore,
        [ContainerStore.id]: ContainerStore
    }
} as any);

Vue.prototype.$store = store;

export default store;
