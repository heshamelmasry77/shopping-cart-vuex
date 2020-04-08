import shop from "../api/shop";

export default  {
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
}
