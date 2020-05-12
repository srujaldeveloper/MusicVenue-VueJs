<template>
  <div class="m-4">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <b-row class="mb-3 mt-3 p-4 justify-content-md-center bg-white">
      <b-col>
        <h1>Merch</h1>
      </b-col>
    </b-row>
    <b-row class="pt-3 justify-content-md-center">
      <div class="row">
        <div class="col-md-2" v-for="(product, index) in products" :key="`product-${index}`">
          <div>
            <img class="card-img-top bg-white" :src="product.sImageUrlPath" alt="Card image cap" />
            <div class="card-body text-white text-center">
              <h5 class="card-title">
                <p>{{product.sProductName}}</p>
              </h5>
              <!-- <p class="card-text"></p> -->
              <p style="font-size: 16px">$ {{product.sPrice}}</p>
            </div>
          </div>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script>
import ShowService from "../../services/shows.service";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import router from "../../router";
import {
  AuthConfig,
  CommonMessageConfig
} from "../../assets/configuration/config";

export default {
  name: "Merch",
  data() {
    return {
      products: [],
      isLoading: false,
      fullPage: true,
      showService: null
    };
  },
  created() {
    this.showService = new ShowService();
  },
  mounted() {
    let email = localStorage.getItem("Email");
    let password = localStorage.getItem("Password");

    if (email != AuthConfig.sEmail && password != AuthConfig.sPassword) {
      router.push({ name: "login" });
    } else {
      this.getProducts();
    }
  },
  methods: {
    getProducts() {
      this.products = this.showService.getProducts();
    }
  }
};
</script>
