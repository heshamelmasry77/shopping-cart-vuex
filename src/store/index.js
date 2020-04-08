import Vuex from 'vuex'
import Vue from 'vue'
import shop from "../api/shop";

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

    addProductToCart(context, product) { // when the user adds a product to the cart
      if (product.inventory > 0) { // check if the product is in the stock

        // find the item whose id is equal to the given product id
        // check in the cart if no product with this product id in the cart
        const cartItem = context.state.cart.find(item => item.id === product.id);
        // find cartItem
        if (!cartItem) {// if no product with this id in the cart
          // push productToCart // then add this product to the cart
          context.commit('pushProductToCart', product.id) // we commit mutation

        } else { // the cartItem exist we will increment the item quantity (product exist in the cart)
          // incrementItemQuantity  // cartItem :{id, quantity}
          context.commit('incrementItemQuantity', cartItem) // we commit mutation
        }
        context.commit('decrementProductInventory', product) // reduce product inventory by 1
      }
    },
    checkout({state, commit}) {
      shop.buyProducts(
        state.cart,
        () => { // success call
          commit('emptyCart') // make the cart empty
          commit('setCheckoutStatus', 'success') // show a success message
        },
        () => {
          commit('setCheckoutStatus', 'fail') // show a fail message
        }
      )
    }
  },
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

