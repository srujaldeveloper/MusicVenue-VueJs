<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="justify-content-center">
        <div class="col-md-8 mx-auto">
          <div class="card-group">
            <div class="card p-4">
              <div class="card-body">
                <div class="alert alert-danger" v-if="sError">{{sError}}</div>
                <form @submit.prevent="checkLogin">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="loginModel.sEmail"
                      placeholder="Email"
                      id="sEmail"
                      name="Email"
                      class="form-control"
                      :class="{ 'is-invalid': submitted && $v.loginModel.sEmail.$error }"
                      :maxlength="50"
                      autocomplete="off"
                    />
                    <div v-if="submitted && $v.loginModel.sEmail.$error" class="text-danger">
                      <!-- {{ errors.first('Email') }} -->
                      <span v-if="!$v.loginModel.sEmail.required">Email is required</span>
                      <span v-if="!$v.loginModel.sEmail.email">Email is invalid</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      v-model="loginModel.sPassword"
                      class="form-control"
                      placeholder="Password"
                      id="sPassword"
                      name="Password"
                      :class="{ 'is-invalid': submitted && $v.loginModel.sPassword.$error }"
                      :maxlength="50"
                      autocomplete="off"
                    />
                    <div
                      v-if="submitted && !$v.loginModel.sPassword.required"
                      class="text-danger"
                    >Password is required</div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <button class="btn btn-primary" id="loginBtn">Login</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router";
import {
  AuthConfig,
  CommonMessageConfig
} from "../../assets/configuration/config";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mounted() {
    localStorage.removeItem("Email");
    localStorage.removeItem("Password");
  },
  data() {
    return {
      loginModel: {
        sEmail: undefined,
        sPassword: undefined
      },
      sError: undefined,
      config: AuthConfig,
      submitted: false
    };
  },
  validations: {
    loginModel: {
      sEmail: { required, email },
      sPassword: { required }
    }
  },
  methods: {
    checkLogin(e) {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (
        this.loginModel.sEmail == this.config.sEmail &&
        this.loginModel.sPassword == this.config.sPassword
      ) {
        localStorage.setItem("Email", this.loginModel.sEmail);
        localStorage.setItem("Password", this.loginModel.sPassword);
        router.push({ name: "createshow" });
      } else {
        this.sError = CommonMessageConfig.InvalidCredential;

        setTimeout(() => {
          this.sError = "";
        }, 3000);
      }

      // e.target.reset();
    }
  }
};
</script>