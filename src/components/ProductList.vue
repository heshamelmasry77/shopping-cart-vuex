<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      alt=""
      src="https://i.imgur.com/JfPpwOA.gif"
    >
    <ul v-else>
      <li v-for="product in products"> {{product.title}} - {{product.price}}
        <button @click="addProductToCart(product)">Add To Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: 'ProductList',
    data() {
      return {
        loading: false
      }
    },
    computed: {
      products() {
        return this.$store.state.products
      },
      availableProducts() {
        return this.$store.getters.availableProducts
      }
    },
    created() {
      this.loading = true
      // To call an action we use store.dispatch
      this.$store.dispatch('fetchProducts')
        .then(() => this.loading = false) //switch back the loading to false when the promise resolved
    },
    methods: {
      addProductToCart(product) {
        this.$store.dispatch('addProductToCart', product)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
