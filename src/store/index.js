import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
// Creating vuex store
export default new Vuex.Store({ // State, Mutations, Getters, Actions and Modules
  state: { // = data
    products: []
  },
  getters: { // = computed properties
    availableProducts(state, getters) {
      // ... return for the products array
      return state.products.filter(product => product.inventory > 0)
    }
  },
  actions: { // = methods
    fetchProducts() {
      // make the api call
      // run setProducts mutation
    }
  },
  mutations: { // = are responsible for setting and updating the state
    setProducts(state, products) { // products is the payload
      // update products
      state.products = products
    }
  }
})
