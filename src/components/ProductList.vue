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

  export default {
    name: 'ProductList',
    data() {
      return {
        products: []
      }
    },
    created() {
      shop.getProducts(products => {
        this.products = products
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
