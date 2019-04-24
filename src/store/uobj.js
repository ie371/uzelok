export default {
	state: {
		uu_co: {
			name: '',
			tipe: '',
			q: '',
			t1: '',
			t2: '',
			p1: '',
			p2: '',
			sx_pr: 0,
			fu: 0
		}
	},

	actions: {
		change_tree_metodics(context, p) {
			const _spec = this.state.MetModule.spec[p];
			context.commit('mu_tree', _spec);
		}
	}
};
