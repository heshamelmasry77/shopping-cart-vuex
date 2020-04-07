import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
// Creating vuex store
new Vuex.Store({ // State, Mutations, Getters, Actions and Modules
  state: { // = data
    products: []
  },
  getters: { // = computed properties
    productCount() {
      // ... return for the products array
    }
  },
  actions: { // = methods
    fetchProducts() {
      // make the api call
    }
  },
  mutations: { // = are responsible for setting and updating the state
    setProducts() {
      // update products
    }
  }
})
