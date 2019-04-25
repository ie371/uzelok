import Vue from 'vue';
import Vuex from 'vuex';
import calcModule from '@/store/calc';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isxx: {
			showCoForm: false
		}
	},
	modules: {
		calcModule
	},
	getters: {
		getshowCoForm: (state) => state.isxx.showCoForm
	},
	mutations: {
		mu_showCoForm(state) {
			state.isxx.showCoForm = !state.isxx.showCoForm;
		}
	},
	actions: {
		change_showCoForm(context) {
			context.commit('mu_showCoForm');
		}
	}
});
