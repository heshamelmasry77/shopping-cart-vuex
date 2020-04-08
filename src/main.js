import Vue from 'vue'
import App from './App'
import store from './store/index'
import currency from './currency';

Vue.config.productionTip = false
Vue.filter('currency', currency) // registering a filter

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store, // using the store globally
  render: h => h(App)
})
// we access the store this.store
