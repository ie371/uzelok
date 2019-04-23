import Vue from 'vue';
import Vuex from 'vuex';
import calcModule from '@/store/calc';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		calcModule
	}
});
