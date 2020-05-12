<template>
  <b-row class="ml-2 mt-4 mr-2 mb-4 bg-white">
    <b-col cols="12" xl="12" class="m-2 text-center">
      <label class="fontbold">GENRE &nbsp;</label>
      <Dropdown
        v-model="selectedGenre"
        :options="genre"
        optionLabel="sGenreName"
        placeholder="Select a Genre"
        @change="getPostByGenre"
      />
    </b-col>
    <b-col cols="12" xl="12" class="m-2">
      <FullCalendar :events="posts" :options="options" />
    </b-col>
  </b-row>
</template>

<script>
import ShowService from "../../services/shows.service";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import router from "../../router";
import {
  AuthConfig,
  CommonMessageConfig
} from "../../assets/configuration/config";
export default {
  name: "Shows",
  data() {
    return {
      options: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: new Date(),
        displayEventTime: false,
        header: {
          left: "prev,next",
          center: "title",
          right: ""
        },

        eventClick: function(info) {
          router.push({ name: "ShowDetails", params: { id: info.event.id } });
        }
      },

      editable: false,
      posts: [],
      allPosts: [],
      genre: [],
      selectedGenre: {
        nGenreId: 0,
        sGenreName: "All"
      }
    };
  },
  showService: null,
  created() {
    this.showService = new ShowService();
  },
  mounted() {
    let email = localStorage.getItem("Email");
    let password = localStorage.getItem("Password");

    if (email != AuthConfig.sEmail && password != AuthConfig.sPassword) {
      router.push({ name: "login" });
    } else {
      let _this = this;
      this.getGenre();
      this.showService.getPosts().then(response => {
        response.map((doc, index) => {
          if (doc.data().id) {
            this.posts.push(doc.data());
            this.allPosts.push(doc.data());
          }
        });
      });
    }
  },
  methods: {
    getGenre() {
      let response = JSON.parse(JSON.stringify(this.showService.getGenre()));
      response.push({
        nGenreId: 0,
        sGenreName: "All"
      });
      this.genre = this.alphaSortByKey(response, "nGenreId");
    },
    getPostByGenre() {
      if (this.selectedGenre.nGenreId == 0) {
        this.posts = this.allPosts;
      } else {
        this.posts = this.allPosts.filter(
          post => post.nGenreId == this.selectedGenre.nGenreId
        );
      }
    },
    alphaSortByKey: function(arr, key) {
      arr.sort(function(a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      return arr;
    }
  }
};
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
</style>
