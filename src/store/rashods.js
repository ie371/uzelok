export default {
	state: {
		uzels: {},
		uzel_s: [],
		counts: {
			co: 1,
			vent: 1,
			gvs: 1
		}
	},

	getters: {},
	actions: {
		REMOVE_UU(context, payload) {
			context.commit('MU_REMOVE_UU', payload);
		},
		ADD_UU(context, payload) {
			context.commit('increment', payload.tipe);
			context.commit('MU_ADD_UU', payload);
		},
		ADD_GIDR_UU(context, payload) {
			// console.log('ADD_GIDR_UU', payload);
			const _q = JSON.parse(payload);

			// console.log('ADD_GIDR_UU', _q);
			context.commit('MU_ADD_GIDR_UU', _q);
		}
	},
	mutations: {
		MU_ADD_UU(state, payload) {
			this.state.RasHods.uzels[payload.name] = payload;
			this.state.RasHods.uzel_s.push(payload);
		},
		MU_ADD_GIDR_UU(state, payload) {
			let id = Object.keys(payload)[0];
			let sa = id.split('-', 1);
			this.state.RasHods.uzels[sa].GIDR = payload;
		},
		MU_REMOVE_UU(state, payload) {
			let _arr = this.state.RasHods.uzel_s;
			let _aa = '';
			_arr.forEach(function(el) {
				if (el.id == payload) {
					_aa = _arr.indexOf(el);
				}
			});
			delete this.state.RasHods.uzels[payload];
			// this.state.RasHods.uzel_s.splice(this.state.RasHods.uzel_s.indexOf(payload), 1);
			this.state.RasHods.uzel_s.splice(_aa, 1);
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
