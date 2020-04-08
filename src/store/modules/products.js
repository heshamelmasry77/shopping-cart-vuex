// Product Module

import shop from "../../api/shop";

export default {
  namespaced: true,

  state: {  // = data
    products: [],

  },
  getters: {  // = computed properties
    availableProducts(state, getters) {
      // ... return for the products array
      return state.products.filter(product => product.inventory > 0)
    },

    productIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    }
  },
  actions: { // api calls etc // = methods
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
  },
  mutations: {
    setProducts(state, products) { // products is the payload
      // update products
      state.products = products
      console.log(state)
    },

    decrementProductInventory(state, product) {
      product.inventory--
    },
  }
}
