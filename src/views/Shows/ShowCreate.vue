<template>
  <div class="m-4">
    <b-row class="mb-3 mt-3 p-4 justify-content-md-center bg-white">
      <b-col>
        <h1>Create Show</h1>
      </b-col>
    </b-row>
    <Toast />
    <b-row class="pt-3 bg-white">
      <div class="card w-100">
        <!-- <div class="card-header">
        <h1 class="h3 m-0">Create Show</h1>
        </div>-->
        <div class="card-body">
          <div>
            <div class="form-group">
              <label for="sName" class="font-weight-bold">
                Show Name
                <span class="required">*</span>
              </label>
              <input
                type="text"
                v-model="showModel.sName"
                placeholder="Show Name"
                id="sName"
                name="Name"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.showModel.sName.$error }"
                :maxlength="100"
              />
              <div
                v-if="submitted && !$v.showModel.sName.required"
                class="text-danger"
              >Show name is required</div>
            </div>
            <div class="form-group">
              <label for="sDescription" class="font-weight-bold">
                Description
                <span class="required">*</span>
              </label>
              <ckeditor
                :editor="editor"
                class="form-control"
                v-model="showModel.sDescription"
                rows="5"
                id="sDescription"
                name="Description"
                :class="{ 'is-invalid': submitted && $v.showModel.sDescription.$error }"
                :maxlength="5000"
                :config="editorConfig"
              ></ckeditor>
              <div
                v-if="submitted && !$v.showModel.sDescription.required"
                class="text-danger"
              >Description is required</div>
            </div>
            <div class="form-group">
              <div for="dDate" class="mb-2 font-weight-bold">
                Show Date
                <span class="required">*</span>
              </div>
              <Calendar
                v-model="showModel.dDate"
                id="dDate"
                name="Date"
                :class="{ 'is-invalid': submitted && $v.showModel.dDate.$error }"
                :showIcon="true"
                :showTime="true"
                :showSeconds="true"
                autocomplete="off"
              />
              <div
                v-if="submitted && !$v.showModel.dDate.required"
                class="text-danger"
              >Date is required</div>
            </div>
            <div class="form-group">
              <label for="nPrice" class="font-weight-bold">
                Ticket Price
                <span class="required">*</span>
              </label>
              <input
                type="number"
                v-model="showModel.nTicketPrice"
                placeholder="Ticket Price"
                id="nPrice"
                name="Price"
                min="1"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.showModel.nTicketPrice.$error }"
                :maxlength="4"
              />
              <div
                v-if="submitted && !$v.showModel.nTicketPrice.required"
                class="text-danger"
              >Price is required</div>
            </div>
            <div class="form-group">
              <div for="sGenreName" class="mb-2 font-weight-bold">
                Genre
                <span class="required">*</span>
              </div>
              <Dropdown
                v-model="selectedGenre"
                :options="genres"
                name="Genre"
                optionLabel="sGenreName"
                placeholder="Select a Genre"
                @change="onChangeGenre"
                :class="{ 'is-invalid': submitted && $v.selectedGenre.$error }"
                style="width: 210px !important;"
              />
              <div
                v-if="submitted && !$v.selectedGenre.required"
                class="text-danger"
              >Genre is required</div>
            </div>
            <div class="form-group">
              <div for="sArtistName" class="mb-2 font-weight-bold">
                Artist
                <span class="required">*</span>
              </div>
              <Dropdown
                v-model="selectedArtist"
                :options="artists"
                name="Artist"
                optionLabel="sArtistName"
                placeholder="Select a Artist"
                :class="{ 'is-invalid': submitted && $v.selectedArtist.$error }"
                style="width: 210px !important;"
              />
              <div
                v-if="submitted && !$v.selectedArtist.required"
                class="text-danger"
              >Artist is required</div>
            </div>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-primary" v-on:click="saveShow()" type="submit">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script>
import ShowService from "../../services/shows.service";
import moment from "moment";
import {
  AuthConfig,
  CommonMessageConfig
} from "../../assets/configuration/config";
import router from "../../router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "ShowCreate",
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
    }
  },
  data() {
    return {
      messages: [],
      genres: [],
      artists: [],
      selectedGenre: null,
      selectedArtist: null,
      showModel: {
        sName: undefined,
        sDescription: undefined,
        dDate: null,
        // sVenue: undefined,
        nTicketPrice: undefined,
        // sPhoneNo: undefined,
        nGenreId: undefined
      },
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
        toolbar: {
          items: ["bold", "italic", "undo", "redo"]
        }
      },
      submitted: false
    };
  },
  validations: {
    showModel: {
      sName: { required },
      sDescription: { required },
      dDate: { required },
      nTicketPrice: { required }
    },
    selectedGenre: { required },
    selectedArtist: { required }
  },
  methods: {
    getGenre() {
      // this.showService.getGenre().then(response => {
      this.genres = this.alphaSortByKey(
        this.showService.getGenre(),
        "nGenreId"
      );
      // });
    },
    alphaSortByKey: function(arr, key) {
      arr.sort(function(a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      return arr;
    },
    onChangeGenre() {
      let genreId = this.selectedGenre.nGenreId;
      // this.showService.getArtistByGenre(genreId).then(response => {
      this.artists = this.alphaSortByKey(
        this.showService.getArtistByGenre(genreId),
        "nArtistId"
      );
      // });
    },
    saveShow() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let objRequest = {
        sName: this.showModel.sName.replace(/\s+/g, " ").trim(),
        sDescription: this.showModel.sDescription,
        dDate: this.formatDate(this.showModel.dDate),
        // sVenue: this.showModel.sVenue.replace(/\s+/g, " ").trim(),
        nTicketPrice: this.showModel.nTicketPrice,
        // sPhoneNo: this.showModel.sPhoneNo,
        nGenreId: this.selectedGenre.nGenreId,
        nArtistId: this.selectedArtist.nArtistId,
        start: this.formatDate(this.showModel.dDate),
        title: this.showModel.sName.replace(/\s+/g, " ").trim()
      };

      this.showService.saveShow(objRequest).then(response => {
        if (response) {
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: CommonMessageConfig.SaveSuccessfully,
            life: 1500
          });
          setTimeout(() => {
            router.push({ name: "Shows" });
          }, 1000);

          // window.location.reload();
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Error Message",
            detail: CommonMessageConfig.ErrorMessage,
            life: 1500
          });
        }
      });
    },
    formatDate(date) {
      return moment(date).format();
    }
  }
};
</script>