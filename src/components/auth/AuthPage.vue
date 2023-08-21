<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col md="6" class="d-none d-md-flex bg-image"></v-col>
      <v-col md="6" class="bg-light">
        <v-card class="login d-flex align-center py-5">
          <v-container>
            <v-row>
              <v-col cols="10" xl="7" class="mx-auto">
                <h1 class="display-4">CEREBRUM ADMIN TOKO</h1>
                <p class="text-muted mb-4">Silahkan login terlebih dahulu</p>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    hint="Masukkan Email"
                    placeholder="adminToko1@gmail.com"
                    required
                    autofocus
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    hint="Masukkan Password"
                    required
                    type="password"
                  ></v-text-field>
                  <v-btn type="submit" class="mb-2" color="primary" block large>
                    Login
                  </v-btn>
                </v-form>
                <!-- Error Alert -->
                <v-alert v-if="showErrorAlert" type="error" class="mt-3">
                  Invalid credentials
                </v-alert>
                <!-- Success Alert -->
                <v-alert
                  :value="alert"
                  v-model="alert"
                  v-if="showSuccessAlert"
                  type="success"
                  class="mt-3"
                >
                  Login success
                </v-alert>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import User from "@/model/User";
import AuthViewModel from "@/viewmodel/AuthViewModel";

export default {
  mixins: [AuthViewModel],
  computed: {
    ...mapState(["userData", "authToken"]),
  },
  data() {
    return {
      showErrorAlert: false,
      showSuccessAlert: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await User.login(this.email, this.password);
        const { user, token } = response.data;

        // Commit mutations to set the userData and authToken in the Vuex store
        await this.$store.commit("setUserData", user);
        await this.$store.commit("setAuthToken", token);

        // Successful login, store user data in localStorage or Vuex store
        localStorage.setItem("user", JSON.stringify(user));

        // Show login success alert
        this.showSuccessAlert = true;

        // Redirect to home page after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          this.$router.push("/home");
        }, 2000);
        setTimeout(() => {
          this.alert = false;
        }, 1000); // Adjust the delay as needed
      } catch (error) {
        // Invalid credentials, display error alerts
        this.showErrorAlert = true;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

* {
  font-family: Poppins;
  src: url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
}

.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url("https://bootstrapious.com/i/snippets/sn-page-split/bg.jpg");
  background-size: cover;
  background-position: center center;
}

.v-text-field {
  width: 100%;
}
.v-btn {
  text-transform: capitalize;
}
</style>
