// Cart Module

import shop from "../../api/shop";

export default {
  state: {
    // {id, quantity} // just id and the number of items the user wants to buy
    cart: [],
    checkoutStatus: null
  },
  getters: {
    cartProducts(state, getters, rootState) {
      return state.cart.map(cartItem => {
        const product = rootState.products.products.find(product => product.id === cartItem.id)
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
  },
  actions: {
    addProductToCart(context, product) { // when the user adds a product to the cart
      if (product.inventory > 0) { // check if the product is in the stock

        // find the item whose id is equal to the given product id
        // check in the cart if no product with this product id in the cart
        const cartItem = context.rootState.cart.cart.find(item => item.id === product.id);
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
    checkout({state, commit }) { // we used the state only because it depends on the local state of the module
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
  mutations: {
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    },
    emptyCart(state) {
      state.cart = []
    }
  }
}
