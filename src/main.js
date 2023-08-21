/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import 'vuetify/dist/vuetify.css';

// Components
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPhone);

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
})

axios.defaults.withCredentials = true;

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')

app.use(router).use(store).use(vuetify).component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')