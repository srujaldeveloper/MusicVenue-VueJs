<template>
  <div class="m-4">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <b-row class="mb-3 mt-3 p-4 justify-content-md-center bg-white">
      <b-col>
        <h1>FAQs</h1>
      </b-col>
    </b-row>
    <b-row
      class="pt-3 justify-content-md-center bg-white"
      v-for="(faq, index) in faqs"
      :key="`faq-${index}`"
    >
      <b-col>
        <h4>{{index+1}}) {{faq.sQuestion}} :</h4>
        <p v-html="faq.sAnswer"></p>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import ShowService from "../../services/shows.service";
import { AuthConfig } from "../../assets/configuration/config";
import router from "../../router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "FAQ",
  data() {
    return {
      faqs: [],
      isLoading: false,
      fullPage: true
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
      this.fetchFaqs();
    }
  },
  methods: {
    fetchFaqs() {
      this.isLoading = true;
      this.$store
        .dispatch("GET_FAQS")
        .then(response => {
          this.faqs = response;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
