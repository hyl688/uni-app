import Vue from 'vue';
import './lib';
import cuCustom from './lib/colorui/components/cu-custom.vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.component('cu-custom', cuCustom);

new Vue({
	store,
	render(r) {
		return r(App)
	},
}).$mount()
