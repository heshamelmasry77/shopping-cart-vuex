<template>
  <div class="ShoppingCart">
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products">
        Title : {{product.title}} - Price : {{product.price | currency}} - Quantity : {{product.quantity}}
      </li>
    </ul>
    Total {{total | currency}}
    <!--    <button @click="$store.dispatch('checkout')">Checkout</button>-->
    <button @click="checkout">Checkout</button>

    <!--    <p v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p>-->
    <p v-if="checkoutStatus">{{checkoutStatus}}</p>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'ShoppingCart',
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        products: 'cartProducts',
        total: 'cartTotal'

      }),
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus
      }),
      // products() {
      //   return this.$store.getters.cartProducts
      // },
      // total() {
      //   return this.$store.getters.cartTotal
      // }
    },
    methods: {
      ...mapActions({
        checkout: 'checkout'
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
