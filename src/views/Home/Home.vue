<template>
  <div class="m-4">
    <b-row class="mb-3 mt-3 p-4 justify-content-md-center bg-white">
      <b-col>
        <h1>Venue - Famous Venue</h1>
      </b-col>
    </b-row>
    <b-row class="pt-3 justify-content-md-center bg-white">
      <b-col>
        <h4>Venue - Famous Venue</h4>
        <div>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</div>
        <div align="center" class="mt-3 mb-3">
          <img
            src="../../assets/images/Picture1.png"
            alt
            height="350"
            width="350"
            class="home-image"
          />
        </div>
        <div class="mb-1">General Email: admin@admin.com</div>
        <div>The Music Hall 111-111-111 | Address goes here</div>
        <div
          class="mb-2"
        >Tickets also available at The Venue Box Office, any night we have a show, from 8-12pm.</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import router from "../../router";
import {
  AuthConfig
} from "../../assets/configuration/config";
export default {
  name: "HomePage",
  mounted() {
    let email = localStorage.getItem("Email");
    let password = localStorage.getItem("Password");

    if (email != AuthConfig.sEmail && password != AuthConfig.sPassword) {
      router.push({ name: "login" });
    }
  }
};
</script>