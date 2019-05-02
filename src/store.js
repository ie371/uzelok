import Vue from 'vue';
import Vuex from 'vuex';
import calcModule from '@/store/calc';
import RasHods from '@/store/rashods';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isxx: {
			showCoForm: false,
			showVentForm: false,
			showGvsForm: false
		},
		numb_uu: 0
	},
	modules: {
		calcModule,
		RasHods
	},
	getters: {
		// getshowCoForm: (state) => state.isxx.showCoForm,
		// getshowVentForm: (state) => state.isxx.showVentForm
	},
	mutations: {
		mu_numb_uu(state) {
			this.state.numb_uu++;
		},
		mu_showCoForm(state) {
			state.isxx.showCoForm = !state.isxx.showCoForm;
		},
		mu_showVentForm(state) {
			state.isxx.showVentForm = !state.isxx.showVentForm;
		},
		mu_showGvsForm(state) {
			state.isxx.showGvsForm = !state.isxx.showGvsForm;
		}
	},
	actions: {
		change_numb_uu(context, payload) {
			context.commit('mu_numb_uu', payload);
		},
		change_showCoForm(context) {
			context.commit('mu_showCoForm');
		},
		change_showVentForm(context) {
			context.commit('mu_showVentForm');
		},
		change_showGvsForm(context) {
			context.commit('mu_showGvsForm');
		}
	}
});
