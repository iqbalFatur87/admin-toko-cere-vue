<template>
  <v-app-bar app class="bg-primary" color="primary" dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title class="white--text">{{ brandName }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      text
      class="white--text"
      v-for="link in navLinks"
      :key="link.to"
      :to="link.to"
    >
      {{ link.text }}
    </v-btn>

    <v-btn text class="white--text" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import User from "./model/User";
import { mapMutations } from "vuex";

export default {
  props: {
    brandName: {
      type: String,
      default: "Admin Toko",
    },
    homeLink: {
      type: String,
      default: "#",
    },
    navLinks: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations(["clearUserData"]),
    async logout() {
      try {
        const isAuthenticated = await User.checkAuthentication();
        console.log("Is authenticated:", isAuthenticated);

        if (isAuthenticated) {
          // Call the clearUserData mutation from Vuex to clear userData and authToken
          await this.clearUserData();

          this.$router.push("/");
        } else {
          console.log("User is not authenticated. Skipping logout");
        }
      } catch (error) {
        // Handle logout error
        console.error("Logout error:", error);
        // Optionally, show an error message to the user or handle the error in some other way
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
* {
  font-family: Poppins;
  src: url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
}
</style>
