export default {
	state: {
		uzels: {},
		counts: {
			co: 1,
			vent: 1,
			gvs: 1
		}
	},

	getters: {
		getuzels: (state) => state.uzels
	},

	actions: {
		REMOVE_UU(context, payload) {
			context.commit('MU_REMOVE_UU', payload);
		},
		ADD_UU(context, payload) {
			let _id = '';
			let _q1 = '';
			let ee = '';
			switch (payload.tipe) {
				case 'showCoForm':
					_q1 = 'uselCo_';
					ee = this.state.RasHods.counts.co;
					break;
				case 'showVentForm':
					_q1 = 'uselVent_';
					ee = this.state.RasHods.counts.vent;
					break;
				case 'showGvsForm':
					_q1 = 'uselGvs_';
					ee = this.state.RasHods.counts.gvs;
					break;
				default:
					break;
			}
			context.commit('increment', payload.tipe);
			// _id = `uselCo_${ee}`;
			_id = _q1 + ee;
			payload.id = _id;
			let pay = {
				name: _id,
				isx: payload
			};
			context.commit('MU_ADD_UU', pay);
		},
		ADD_GIDR_UU(context, payload) {
			console.log('ADD_GIDR_UU', payload);
			context.commit('MU_ADD_GIDR_UU', payload);
		}
	},

	mutations: {
		MU_ADD_UU(state, payload) {
			this.state.RasHods.uzels[payload.name] = payload.isx;
		},
		MU_ADD_GIDR_UU(state, payload) {
			this.state.RasHods.uzels[payload.id]['GIDR'] = payload.result;
		},
		MU_REMOVE_UU(state, payload) {
			delete this.state.RasHods.uzels[payload];
		},
		increment(state, payload) {
			switch (payload) {
				case 'showCoForm':
					this.state.RasHods.counts.co++;
					break;
				case 'showVentForm':
					this.state.RasHods.counts.vent++;
					break;
				case 'showGvsForm':
					this.state.RasHods.counts.gvs++;
					break;
				default:
					break;
			}
		}
	}
};
