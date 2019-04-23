export default {
	state: {
		// hide3:true,
		isxcalc: {
			tipuu: '',
			sx_ot: 0,
			sx_otkr: 0,
			sx_gvs: 0,
			qco: null,
			qmax: null,
			qgvssr: null,
			kch: 2.2,
			t1: 95,
			t2: 70,
			t3: 60,
			t4: 50,
			p1: null,
			p2: null,
			p3: null,
			p4: null,
			di1: 0,
			di2: 0,
			di9: 0,
			di3: 0,
			di4: 0,
			dut1: null,
			dut2: null,
			dut9: null,
			dut3: null,
			dut4: null,
			tipLo: 'kl',
			tipLg: 'kl',
			tipIMo: 6,
			tipIMg3: 6,
			tipIMg4: 6,
			txvL: 15,
			txvZ: 5,
			filo: 0,
			filg: 0,
			filp: 0,
			selReg: '0',
			mess: [],
			indexnas: ''
		},
		sbKP: {
			tipSB: 0,
			lvru: 30,
			lsb: 15
		},

		rescalc: {
			OT: {},
			gdr1: { du_im: 0 },
			gdr2: { du_im: 0 },
			gdr9: { du_im: 0 },
			gdr3: { du_im: 0 },
			gdr4: { du_im: 0 },
			Ggvs: {}
		}
	},

	getters: {
		getisxcalc: (state) => state.isxcalc,
		getrescalc: (state) => state.rescalc,
		getSbKp: (state) => state.sbKP
	},

	actions: {
		actpeR(context, W) {
			context.commit('mupeR', W);
		},
		actkch(context, kc) {
			context.commit('mukch', kc);
		},
		actqm(context, qs) {
			context.commit('muqm', qs);
		},
		actqs(context, qm) {
			context.commit('muqs', qm);
		},
		actrescalc(context, ek) {
			context.commit('murescalc', ek);
		},
		actdisotkr(context, fp) {
			context.commit('mudisotkr', fp);
		},
		actnum(context, q) {
			context.commit('munum', q);
		},
		actspeed(context, s) {
			context.commit('muSpeed', s);
		},
		actnas(context, nas) {
			context.commit('munas', nas);
		},
		tupik(context, tup) {
			context.commit('mutupik', tup);
		},
		tipuz(context, ti) {
			context.commit('mutipuz', ti);
		},
		filO(context, fo) {
			context.commit('mufilO', fo);
		},
		filG(context, fg) {
			context.commit('mufilG', fg);
		},
		truba(context, tr) {
			context.commit('mutruba', tr);
		}
	},

	mutations: {
		mupeR(state, payload) {
			if (payload.d === 't1') {
				state.rescalc.gdr1 = payload.result;
				state.isxcalc.di1 = payload.result.du_im;
				state.isxcalc.di2 = payload.result.du_im;
				state.isxcalc.qco = null;
				state.isxcalc.dut1 = payload.result.du_im;
				state.rescalc.gdr2 = payload.result;
			}
			if (payload.d === 't3') {
				// console.log('t33333', payload.result.Gv)
				state.rescalc.gdr3 = payload.result;

				if (payload.result.Gv) {
					state.rescalc.gdr4.Gv = (payload.result.Gv * 0.4).toFixed(3);
				} else {
					state.rescalc.gdr4 = payload.result;
					state.isxcalc.di4 = payload.result.du_im;
					state.isxcalc.dut4 = payload.result.du_im;
				}
				state.isxcalc.qmax = null;
				state.isxcalc.qgvssr = null;
				state.isxcalc.di3 = payload.result.du_im;
				state.isxcalc.dut3 = payload.result.du_im;
			}
			if (payload.d === 't4') {
				state.rescalc.gdr4 = payload.result;
				state.isxcalc.di4 = payload.result.du_im;
				state.isxcalc.dut4 = payload.result.du_im;
			}
			if (payload.d === 't9') {
				state.rescalc.gdr9 = payload.result;
				state.isxcalc.qco = null;
				state.isxcalc.dut9 = payload.result.du_im;
				state.rescalc.gdr2 = {};
			}
		},
		mutruba(state, payload) {
			// console.log('payload',payload.res)
			switch (payload.t) {
				case 't1':
					state.isxcalc.dut1 = +payload.res;
					state.isxcalc.dut2 = +payload.res;
					break;
				case 't9':
					state.isxcalc.dut9 = payload.res;
					break;
				case 't3':
					state.isxcalc.dut3 = payload.res;
					break;
				case 't4':
					state.isxcalc.dut4 = payload.res;
					break;
			}
		},
		murescalc(state, payload) {
			if (payload.result.gdr1) {
				state.rescalc.gdr1 = payload.result.gdr1;
				state.isxcalc.di1 = payload.result.gdr1.du_im;
				state.isxcalc.dut1 = payload.result.gdr1.du_tr;
				state.rescalc.OT = payload.result.OT;
			}
			if (payload.result.gdr2) {
				state.rescalc.gdr2 = payload.result.gdr2;
				state.isxcalc.di2 = payload.result.gdr1.du_im;
				state.isxcalc.dut2 = payload.result.gdr2.du_tr;
			}
			if (payload.result.gdr9) {
				state.rescalc.gdr9 = payload.result.gdr9;
				state.isxcalc.di9 = payload.result.gdr9.du_im;
				state.isxcalc.dut9 = payload.result.gdr9.du_tr;
			}
			if (payload.result.gdr3) {
				state.rescalc.gdr3 = payload.result.gdr3;
				state.isxcalc.di3 = payload.result.gdr3.du_im;
				state.isxcalc.dut3 = payload.result.gdr3.du_tr;
				state.rescalc.Ggvs = payload.result.Ggvs;
			}
			if (payload.result.gdr4) {
				state.rescalc.gdr4 = payload.result.gdr4;
				state.isxcalc.di4 = payload.result.gdr4.du_im;
				state.isxcalc.dut4 = payload.result.gdr4.du_tr;
				state.rescalc.Ggvs = payload.result.Ggvs;
			}
		},

		muSpeed(state, payload) {
			if (payload.d === 't1') {
				state.rescalc.gdr1 = payload.result;
				state.isxcalc.dut1 = payload.result.du_im;
				state.rescalc.gdr2 = payload.result;
			}
			if (payload.d === 't3') {
				state.rescalc.gdr3 = payload.result;
				state.isxcalc.dut3 = payload.result.du_im;
			}
			if (payload.d === 't4') {
				state.rescalc.gdr4 = payload.result;
				state.isxcalc.dut4 = payload.result.du_im;
			}
			if (payload.d === 't9') {
				state.rescalc.gdr9 = payload.result;
				state.isxcalc.dut9 = payload.result.du_im;
			}
		},

		mukch(state, payload) {
			state.isxcalc.qmax = null;
			state.isxcalc.qgvssr = null;
		},

		muqm(state, payload) {
			if (payload <= 0) {
				state.isxcalc.qmax = null;
			} else {
				if (payload > 10) {
					payload = payload / 100;
				}
				state.isxcalc.qgvssr = payload;
				state.isxcalc.qmax = (payload * state.isxcalc.kch).toFixed(6);
				state.isxcalc.sx_gvs = 0;
			}
		},

		muqs(state, payload) {
			if (payload <= 0) {
				state.isxcalc.qgvssr = null;
			} else {
				if (payload > 10) {
					payload = payload / 100;
				}
				state.isxcalc.qmax = payload;
				state.isxcalc.qgvssr = (payload / state.isxcalc.kch).toFixed(6);
				state.isxcalc.sx_gvs = 0;
			}
		},

		mudisotkr(state, payload) {
			state.isxcalc.sx_otkr = payload;
		},

		munum(state, payload) {
			if (payload > 10) {
				payload = payload / 100;
			}
			state.isxcalc.qco = payload;
		},
		munas(state, payload) {
			state.isxcalc.mess = payload;
			if (payload == '') {
				state.isxcalc.indexnas = '';
			} else {
				state.isxcalc.indexnas = payload[0].item;
			}
		},
		mutupik(state, payload) {
			state.isxcalc.sx_gvs = payload;
		},
		mutipuz(state, payload) {
			state.isxcalc.tipuu = payload;
		},
		mufilO(state, payload) {
			state.isxcalc.filo = payload;
		},
		mufilG(state, payload) {
			state.isxcalc.filg = payload;
		}
	}
};
