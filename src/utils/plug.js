export default {
	install(vue, options = {}) {
		vue.prototype.testPlug = () => alert('testPlug')

		vue.directive("globalDi", {
			bind(el, binding, vnode) {
				var s = JSON.stringify
				el.innerHTML =
					'name: ' + s(binding.name) + '<br>' +
					'value: ' + s(binding.value) + '<br>' +
					'expression: ' + s(binding.expression) + '<br>' +
					'argument: ' + s(binding.arg) + '<br>' +
					'modifiers: ' + s(binding.modifiers) + '<br>' +
					'vnode keys: ' + Object.keys(vnode).join(', ')
			}
		})
	}
};