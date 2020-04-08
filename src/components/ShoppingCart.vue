<template>
  <div class="ShoppingCart">
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products">
        Title : {{product.title}} - Price : {{product.price | currency}} - Quantity : {{product.quantity}}
      </li>
    </ul>
    Total {{total | currency}}
    <button @click="$store.dispatch('checkout')">Checkout</button>
    <p v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p>
  </div>
</template>

<script>
  export default {
    name: 'ShoppingCart',
    data() {
      return {}
    },
    computed: {
      products() {
        return this.$store.getters.cartProducts
      },
      total() {
        return this.$store.getters.cartTotal
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
