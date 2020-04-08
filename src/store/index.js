import Vuex from 'vuex'
import Vue from 'vue'
import actions from "./actions";
import cart from './modules/cart'
import products from "./modules/products";

Vue.use(Vuex);
// Creating vuex store
export default new Vuex.Store({ // State, Mutations, Getters, Actions and Modules

  modules:{cart, products},
  state: { // = data

  },
  getters: { // = computed properties

  },
  actions: {
    // api calls etc
  }, // = methods
  mutations: { // = are responsible for setting and updating the state ONLY

  }
})
// actions decide when a mutation should fire
// while mutations are always the ones responsible for state changes
// never change a state directly in an action

