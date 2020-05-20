import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import store from '@/store'
import listNews from '@/pages/base/list-news'
import mescrollOptions from '@/pages/base/mescroll-options'
import listProducts from '@/pages/base/list-products'
import mescrollComponent from '@/pages/base/mescroll-component'
import mescrollMore from '@/pages/base/mescroll-more'
import mescrollSwiperNav from '@/pages/base/mescroll-swiper-nav'

Vue.use(Router)

let router = new Router({
	routes: [{
		path: '/',
		name: 'home',
		component: home
	}, {
		path: '/listNews',
		name: 'listNews',
		component: listNews
	}, {
		path: '/mescrollOptions',
		name: 'mescrollOptions',
		component: mescrollOptions
	}, {
		path: '/listProducts',
		name: 'listProducts',
		component: listProducts
	}, {
		path: '/mescrollComponent',
		name: 'mescrollComponent',
		component: mescrollComponent
	}, {
		path: '/mescrollMore',
		name: 'mescrollMore',
		component: mescrollMore
	}, {
		path: '/mescrollSwiperNav',
		name: 'mescrollSwiperNav',
		component: mescrollSwiperNav
	}, {
		path: '/test',
		name: 'test',
		component: (resolve => require(["@/pages/base/test.vue"], resolve))
	}, {
		path: '/marquee',
		name: 'marquee',
		component: (resolve => require(["@/components/marquee.vue"], resolve))
	}]
});

router.beforeResolve(function(to, from, next) {
	// debugger;
	let now = router.getMatchedComponents(to);
	let prevent = router.getMatchedComponents(from);

	let diff = false;
	let actived = now.filter(function(item, i) {
		return diff || (diff = (prevent[i] != item));
	});

	if (!actived.length) {
		return next();
	}

	Vue.$vux.loading.show({
		text: "Loading..."
	});

	Promise.all(actived.filter(function(item) {
		return item.asyncData && (!item.asyncDataFetche || !to.meta.keepAlive);

	}).map(async function(item) {
		await item.asyncData({
			store,
			route: to
		});
		item.asyncDataFetche = true;
	})).then(() => {
		next();
		Vue.$vux.loading.hide();
	});

});

export default router;