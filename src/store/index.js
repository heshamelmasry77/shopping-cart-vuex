import Vuex from 'vuex'
import Vue from 'vue'
import actions from "./actions";

Vue.use(Vuex);
// Creating vuex store
export default new Vuex.Store({ // State, Mutations, Getters, Actions and Modules
  state: { // = data
    products: [],
    // {id, quantity} // just id and the number of items the user wants to buy
    cart: [],
    checkoutStatus: null
  },
  getters: { // = computed properties
    availableProducts(state, getters) {
      // ... return for the products array
      return state.products.filter(product => product.inventory > 0)
    },
    cartProducts(state, getters) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        console.log(product)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity // how many of this specific item
        }
      })
    },
    cartTotal(state, getters) {
      // getters.cartProducts.forEach(product => {
      //   total += product.price * product.quantity // total = total + (product.price * product.quantity)
      // })
      // return total
      // another way
      return getters.cartProducts.reduce((total, product) => {
        console.log(total)
        console.log(product.price)
        console.log(product.quantity)
        return total + (product.price * product.quantity)
      }, 0)
    },
    productIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    }
  },
  actions: actions, // = methods
  mutations: { // = are responsible for setting and updating the state ONLY
    setProducts(state, products) { // products is the payload
      // update products
      state.products = products
      console.log(state)
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++
    },
    decrementProductInventory(state, product) {
      product.inventory--
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    },
    emptyCart(state) {
      state.cart = []
    }
  }
})
// actions decide when a mutation should fire
// while mutations are always the ones responsible for state changes
// never change a state directly in an action

