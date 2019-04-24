import Vue from 'vue';
import Vuex from 'vuex';
import calcModule from '@/store/calc';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isxx: {
			showUploadForm: false
		}
	},
	modules: {
		calcModule
	},
	getters: {
		getshowUploadForm: (state) => state.isxx.showUploadForm
	},
	mutations: {
		mu_showUploadForm(state) {
			state.isxx.showUploadForm = !state.isxx.showUploadForm;
		}
	},
	actions: {
		change_showUploadForm(context) {
			context.commit('mu_showUploadForm');
		}
	}
});
