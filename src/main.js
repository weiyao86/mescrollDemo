import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
	LoadingPlugin
} from 'vux'
// import './assets/css/normalize.css'
import './assets/css/reset.css'

Vue.config.productionTip = false

Vue.use(LoadingPlugin);

new Vue({
	router,
	store,
	render: function(h) {
		return h(App)
	}
}).$mount('#app')