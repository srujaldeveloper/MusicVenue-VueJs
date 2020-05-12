<template>
  <div class="m-4">
    <b-row class="mb-3 mt-3 p-4 justify-content-md-center bg-white">
      <b-col>
        <h1>Cart</h1>
      </b-col>
    </b-row>
    <b-row class="pt-3 justify-content-md-center bg-white">
      <b-col>
        <table class="table table-striped cart">
          <thead>
            <tr class="text-center">
              <th style="width:40%">Show Name</th>
              <th style="width:10%">Ticket Price</th>
              <th style="width:20%">Quantity</th>
              <th style="width:10%">Subtotal</th>
              <th style="width:20%"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cartItem, index) in cartList" :key="`product-${index}`" class="text-center">
              <td data-th="Show">
                <div class="row">
                  <!-- <div class="col-sm-2 hidden-xs">
                    <img src="http://placehold.it/100x100" alt="..." class="img-responsive" />
                  </div>-->
                  <div class="col">
                    <h4 class="nomargin">{{cartItem.sName}}</h4>
                  </div>
                </div>
              </td>
              <td data-th="Price">
                ${{cartItem.nTicketPrice}}
              </td>
              <td data-th="Quantity">
                <!-- <input
                  type="number"
                  class="form-control text-center qty-input"
                  v-model="cartItem.nQty"
                  @change="updateCartQty(cartItem)"
                />-->
                <span class="btn btn-info" @click="OnDecrementQty(cartItem)">-</span>
                <span class="btn mx-1 font-weight-bold">{{cartItem.nQty}}</span>
                <span class="btn btn-info" @click="OnIncrementQty(cartItem)">+</span>
              </td>
              <td data-th="Subtotal" class="text-center">${{cartItem.nTotalPrice}}</td>
              <td class="actions text-center" data-th="Action">
                <button class="btn btn-danger" @click.prevent="removeFromCart(cartItem)">
                  <i class="fa fa-trash-o"></i>
                </button>
              </td>
            </tr>
            <tr v-if="$store.state.cart.length == 0">
              <td colspan="5" class="text-center">No Ticket Found</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="hidden-xs text-right" colspan="5">
                <strong>Subtotal - ${{totalPrice}}</strong>
              </td>
            </tr>
            <tr>
              <td class="hidden-xs text-right" colspan="5">
                <strong>Convenience Fee - ${{nConvenienceFee}}</strong>
              </td>
            </tr>
            <tr>
              <td class="hidden-xs text-right" colspan="5">
                <strong>Total - ${{nGrandTotal}}</strong>
              </td>
              <!-- <td>
                <a href="#" class="btn btn-success btn-block">
                  Checkout
                  <i class="fa fa-angle-right"></i>
                </a>
              </td>-->
            </tr>
          </tfoot>
        </table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { AuthConfig } from "../../assets/configuration/config";
import router from "../../router";

export default {
  name: "Cart",
  data() {
    return {
      nConvenienceFee: 10.0,
      nGrandTotal: 0.0,
      cartList: []
    };
  },
  mounted() {
    let email = localStorage.getItem("Email");
    let password = localStorage.getItem("Password");

    if (email != AuthConfig.sEmail && password != AuthConfig.sPassword) {
      router.push({ name: "login" });
    } else {
      this.getCartItems();
    }
  },
  computed: {
    totalPrice() {
      let total = 0.0;

      for (let item of this.$store.state.cart) {
        total += item.nTotalPrice;
      }

      if (this.$store.state.cart.length > 0) {
        let grandTotal = total + this.nConvenienceFee;
        this.nGrandTotal = grandTotal;
      } else {
        this.nGrandTotal = 0;
        this.nConvenienceFee = 0;
      }

      return total;
    }
  },
  methods: {
    getCartItems() {
      this.cartList = this.$store.state.cart;
    },
    OnDecrementQty(item) {
      this.$store.commit("decrementQty", item);
    },
    OnIncrementQty(item) {
      this.$store.commit("incrementQty", item);
    },
    removeFromCart(item) {
      this.$store.commit("removeFromCart", item);
    }
  }
};
</script>