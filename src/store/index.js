import Vuex from 'vuex'
import Vue from 'vue'
import shop from "../api/shop";

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
    fetchProducts(context) { // context object exposes the same set of methods and properties as a store object
      // context.commit  // context.state =>> to access the state

      // make the api call
      // run setProducts mutation

      // shop.getProducts(products => { // updating the state using mutation
      //   // this.products = products
      //   // commit  a mutation then we pass the name of the mutation
      //   context.commit('setProducts', products)
      // })

// using promises
      return new Promise((resolve, reject) => {
// make the call
        // call setProducts mutation
        shop.getProducts(products => { // updating the state using mutation
          // this.products = products
          // commit  a mutation then we pass the name of the mutation
          context.commit('setProducts', products)
          resolve()
        })
      })

    },

    addToCart(context, product) { // when the user adds a product to the cart
      if (product.inventory > 0) { // check if it is in the stock
        context.commit('pushProductToCart', product)
      }
    }
  },
  mutations: { // = are responsible for setting and updating the state
    setProducts(state, products) { // products is the payload
      // update products
      state.products = products
    }
  }
})
// actions decide when a mutation should fire
// while mutations are always the ones responsible for state changes
// never change a state directly in an action

