import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/main.css";
// import axios from "./plugins/axios";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
/* import specific icons */
import {
  faUser,
  faBell,
  faArrowRightFromBracket,
  faUsers,
  faDashboard,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";

import VueGoogleMaps from "@fawmi/vue-google-maps";

import axios from "axios";
import VueAxios from "vue-axios";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
library.add(
  faUser,
  faBell,
  faArrowRightFromBracket,
  faUsers,
  faTasks,
  faDashboard
);
app.use(VueAxios, axios);
app.use(router);
// app.use(BootstrapVue);
app.use(VueGoogleMaps, {
  load: {
    key: "",
  },
});
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(ElementPlus);
app.mount("#app");
