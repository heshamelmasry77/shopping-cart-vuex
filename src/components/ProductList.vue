<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      alt=""
      src="https://i.imgur.com/JfPpwOA.gif"
    >
    <ul v-else>
      <li v-for="product in products"> {{product.title}} - {{product.price | currency}} - {{product.inventory}}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)">Add To Cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'ProductList',
    data() {
      return {
        loading: false
      }
    },
    // computed: mapState({
    //   products : state => state.products,
    //   firstProduct : state => state.products[1],
    // }),
    computed: {
      ...mapState({ //spread operator to use the other computed properties
        products: state => state.products,
        firstProduct: state => state.products[1],
      }),
      ...mapGetters({
        productIsInStock: 'productIsInStock'
      }),
      // products() {
      //   // console.log(this.$store.getters.availableProducts)
      //   // return this.$store.getters.availableProducts
      //   return this.$store.state.products
      //
      // },
      // availableProducts() {
      //   return this.$store.getters.availableProducts
      // }
      // productIsInStock() { // We used the mapGetters instead of this
      //   return this.$store.getters.productIsInStock
      // }
    },
    created() {
      this.loading = true
      // To call an action we use store.dispatch
      // this.$store.dispatch('fetchProducts')
      this.fetchProducts() // we used it like that because we used the mapActions both works
        .then(() => this.loading = false) //switch back the loading to false when the promise resolved
    },
    methods: {
      ...mapActions({
        fetchProducts: 'fetchProducts',
        addProductToCart:'addProductToCart'
      }),

      // addProductToCart(product) {
      //   this.$store.dispatch('addProductToCart', product) // we used it in the mapActions too
      // }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
