<template>
  <div class="m-4">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <b-row class="justify-content-md-center">
      <b-col sm="4" class="bg-white p-4">
        <h1>Interview</h1>
      </b-col>
    </b-row>
    <b-row
      class="pt-3 justify-content-md-center"
      v-for="(item, index) in interviewsList"
      :key="`interview-${index}`"
    >
      <b-col sm="4" class="bg-white">
        <img
          class="img-thumbnail mt-2"
          :src="item.sImageUrlPath"
          :alt="item.sTitle"
          :title="item.sTitle"
        />
        <h4 class="my-2">{{item.sTitle}} :</h4>
        <p v-html="item.sDescription"></p>
        <!-- <video height="315" controls :src="item.sVideoUrlPath" width="560"></video> -->
        <div class="embed-responsive embed-responsive-4by3 mb-2" v-if="item.sVideoUrlPath != ''">
          <iframe
            width="560"
            height="315"
            :src="item.sVideoUrlPath"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ShowService from "../../services/shows.service";
import router from "../../router";
import {
  AuthConfig,
  CommonMessageConfig
} from "../../assets/configuration/config";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Interview",
  data() {
    return {
      showService: null,
      isLoading: false,
      interviewsList: [],
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
      this.getInterviews();
    }
  },
  methods: {
    getInterviews() {
      this.interviewsList = this.showService.getInterviewsData();
    }
  }
};
</script>