import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store, // using the store globally
  render: h => h(App)
})
// we access the store this.store
