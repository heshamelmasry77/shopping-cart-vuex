<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      alt=""
      src="https://i.imgur.com/JfPpwOA.gif"
    >
    <ul v-else>
      <li v-for="product in products"> {{product.title}} - {{product.price}}</li>
    </ul>
  </div>
</template>

<script>
  import store from '../store/index'

  export default {
    name: 'ProductList',
    data() {
      return {
        loading: false
      }
    },
    computed: {
      products() {
        return store.state.products
      },
      availableProducts() {
        return store.getters.availableProducts
      }
    },
    created() {
      this.loading = true
      // To call an action we use store.dispatch
      store.dispatch('fetchProducts')
        .then(() => this.loading = false) //switch back the loading to false when the promise resolved
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
