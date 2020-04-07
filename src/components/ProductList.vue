<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products"> {{product.title}} - {{product.price}}</li>
    </ul>
  </div>
</template>

<script>
  import shop from '../api/shop'
  import store from '../store/index'

  export default {
    name: 'ProductList',
    computed: {
      products() {
        return store.state.products
      }
    },
    created() {
      shop.getProducts(products => { // updating the state using mutation
        // this.products = products
        // commit a mutation then we pass the name of the mutation
        store.commit('setProducts', products)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
