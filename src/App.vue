<template>
  <v-app>
    <v-main>
      <div>
        <NavbarPage
          v-if="shouldShowNavbar"
          :brandName="brandName"
          :homeLink="homeLink"
          :navLinks="navLinks"
        />
        <router-view :key="$route.fullPath" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { createApp } from "vue";
import { createRouter } from "vue-router";
import NavbarPage from "./NavbarPage.vue";


export default {
  components: {
    NavbarPage,
  },
  data() {
    return {
      brandName: "Admin Toko",
      homeLink: "#",
      navLinks: [
        { to: "/", text: "Login" },
        { to: "/home", text: "Home" },
        { to: "/POS", text: "Transaction" },
        { to: "/products", text: "Products" },
      ],
      showNavbar: true,
    };
  },
  created() {
    this.updatePageTitle(); // Call the method to update the page title initially
  },
  watch: {
    $route() {
      this.updatePageTitle(); // Call the method to update the page title whenever the route changes
    },
  },
  methods: {
    updatePageTitle() {
      // Set the page title based on the current route
      switch (this.$route.path) {
        case "/":
          document.title = "Login - Admin Toko";
          break;
        case "/home":
          document.title = "Home - Admin Toko";
          break;
        case "/transaction":
          document.title = "Transaction - Admin Toko";
          break;
        case "/products":
          document.title = "Products - Admin Toko";
          break;
        case "/accounts":
          document.title = "Account - Admin Toko";
          break;
        default:
          document.title = "Admin Toko";
          break;
      }
    },
  },
  computed: {
    shouldShowNavbar() {
      const hideNavbarRoutes = ["/"];
      return !hideNavbarRoutes.includes(this.$route.path);
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.updatePageTitle(); // Call the method to update the page title when the route changes
    next();
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

</style>

