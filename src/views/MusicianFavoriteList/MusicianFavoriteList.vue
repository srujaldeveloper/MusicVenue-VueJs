<template>
  <div class="m-4">
    <b-row class="mb-3 mt-3 p-4 justify-content-md-center bg-white">
      <b-col>
        <h1>Favorite List</h1>
      </b-col>
    </b-row>
    <b-row class="pt-3 bg-white">
      <!-- <div class="col-xs-12"> -->
      <div class="card w-100">
        <!-- <div class="card-header">
          <div data-v-715a1058>
            <strong data-v-715a1058>Favorite List</strong>
          </div>
        </div>-->
        <div class="card-body">
          <DataTable
            class="p-datatable-responsive"
            :value="shows"
            :paginator="true"
            :rows="5"
            sortField="dDate"
            :sortOrder="1"
          >
            <template #empty>
              <div style="text:align:center">No records found</div>
            </template>
            <template #header>
              <div style="text-align: right">
                <i class="pi pi-search" style="margin: 4px 4px 0px 0px;"></i>
                <InputText v-model="filters" placeholder="Search" size="50" v-on:input="onSearch" />
              </div>
            </template>

            <Column field="sName" header="Show Name" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Show Name</span>
                {{slotProps.data.sName}}
              </template>
            </Column>
            <Column field="sGenreName" header="Genre" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Genre</span>
                {{slotProps.data.sGenreName}}
              </template>
            </Column>
            <Column field="sDescription" header="Description">
              <template #body="slotProps">
                <div class="wrap-text" :title="slotProps.data.sDescription">
                  <span class="p-column-title">Description</span>
                  {{slotProps.data.sDescription}}
                </div>
              </template>
            </Column>
            <Column field="dDate" header="Show Date" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Show Date</span>
                {{slotProps.data.dDate}}
              </template>
            </Column>
            <!-- <Column field="sVenue" header="Venue" :sortable="true">
              <template #body="slotProps">
                <div class="wrap-text" :title="slotProps.data.sVenue">
                  <span class="p-column-title">Venue</span>
                  {{slotProps.data.sVenue}}
                </div>
              </template>
            </Column>-->
            <Column field="sArtistName" header="Artist" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Artist</span>
                {{slotProps.data.sArtistName}}
              </template>
            </Column>
            <Column field="nTicketPrice" header="Ticket Price" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Ticket Price</span>
                ${{slotProps.data.nTicketPrice}}
              </template>
            </Column>
            <!-- <Column field="sPhoneNo" header="Phone No" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Phone No</span>
                {{slotProps.data.sPhoneNo}}
              </template>
            </Column>-->
            <Column header="Action">
              <template #body="slotProps">
                <span class="p-column-title">Action</span>
                <a :href="'/#/details/'+slotProps.data.id">Go to Post</a>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </b-row>
  </div>
  <!-- </div> -->
</template>

<script>
//service
import ShowService from "../../services/shows.service";
import {
  AuthConfig,
  CommonMessageConfig
} from "../../assets/configuration/config";
import router from "../../router";

export default {
  name: "MusicianFavoriteList",
  data() {
    return {
      genre: [],
      artists: [],
      shows: [],
      tempShows: [],
      filters: ""
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
      this.getArtist();
    }
  },
  methods: {
    onSearch(searchText) {
      if (!this.shows) return [];
      if (!searchText) {
        this.p = 1;
        this.shows = [];
        this.shows = this.tempShows;
        return this.shows;
      }

      if (searchText) {
        let text = searchText.toLowerCase();
        let list = this.tempShows.filter(it => {
          return (
            (it.sName != null
              ? it.sName
                  .toString()
                  .toLowerCase()
                  .includes(text)
              : "") ||
            (it.sGenreName != null
              ? it.sGenreName
                  .toString()
                  .toLowerCase()
                  .includes(text)
              : "") ||
            (it.sDescription != null
              ? it.sDescription
                  .toString()
                  .toLowerCase()
                  .includes(text)
              : "") ||
            // (it.sVenue != null
            //   ? it.sVenue
            //       .toString()
            //       .toLowerCase()
            //       .includes(text)
            //   : "") ||
            (it.sArtistName != null
              ? it.sArtistName
                  .toString()
                  .toLowerCase()
                  .includes(text)
              : "") ||
            (it.nTicketPrice != null
              ? it.nTicketPrice
                  .toString()
                  .toLowerCase()
                  .includes(text)
              : "") ||
            (it.title != null
              ? it.title
                  .toString()
                  .toLowerCase()
                  .includes(text)
              : "")
          );
        });

        this.shows = [];
        this.shows = list;
      }
    },
    getGenre() {
      // this.showService.getGenre().then(response => {
        let response = this.showService.getGenre();
        this.genre = response;
        if (this.genre != undefined && this.genre.length > 0) {
          this.getFavoriteShows();
          this.tempShows = this.shows;
        }
      // });
    },
    getArtist() {
      // this.showService.getArtist().then(response => {
        this.artists = this.showService.getArtist();
        if (this.artists != undefined && this.artists.length > 0) {
          this.getFavoriteShows();
          this.tempShows = this.shows;
        }
      // });
    },

    getFavoriteShows() {
      this.shows = JSON.parse(localStorage.getItem("favoriteList"));
      if (this.shows != null) {
        this.shows.forEach(el => {
          if (el) {
            el.sDescription = this.strippedContent(el.sDescription);
            el.sGenreName = this.genre.find(
              x => x.nGenreId == el.nGenreId
            ).sGenreName;

            let artist = this.artists.find(x => x.nArtistId == el.nArtistId);
            if (artist) {
              el.sArtistName = artist.sArtistName;
            }
          }
        });
      }
    },
    strippedContent(string) {
      let regex = /(<([^>]+)>)/gi;
      return string.replace(regex, "");
    }
  }
};
</script>