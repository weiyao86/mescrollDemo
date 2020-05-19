import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		title: 'testTitle'
	},
	getters: {
		getTitle(state) {
			return state.title;
		}
	},
	mutations: {
		changeTitle(state, user) {
			// 变更状态
			state.title = user.title;
		}
	},
	actions: {
		changeTest({
			commit,
			state
		}, obj) {

			setTimeout(() => {

				commit('changeTitle', obj)
				console.log('changeTitle')
			}, 10000);

		}
	},
	modules: {
		modulesA: {
			state: {
				title: 'modulesA testTitle'
			}
		}
	}
})

export default store;