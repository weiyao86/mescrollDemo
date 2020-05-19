import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import
plug
from './utils/plug.js'
import {
	LoadingPlugin
} from 'vux'
// import './assets/css/normalize.css'
import './assets/css/reset.css'

Vue.config.productionTip = false

Vue.use(LoadingPlugin);
Vue.use(plug, {
	Vue
});

new Vue({
	router,
	store,
	render: function(h) {
		return h(App)
	}
}).$mount('#app')